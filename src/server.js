var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");
var pool = require("./dbcon.js").pool;
var cookieParser = require("cookie-parser");

const port = process.env.PORT || 5000;

app.set("port", port);
app.use(cookieParser());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", function (req, res, next) {
  res.send({ message: "welcome!" });
});

// TO DO - ADD TO COLLECTION - (Updating Contains w/ Recipe ID)

// home page

app.get("/home", function (req, res, next) {
  console.log("home query");
  var sql =
    "SELECT Collection.name as c_name, Recipe.name as r_name, category, cook_time, date_created, * FROM Collection JOIN Contains ON Collection.collection_id = Contains.collection_id JOIN Recipe ON Contains.recipe_id = Recipe.recipe_id WHERE Collection.collection_id = Contains.collection_id LIMIT 4;";
  pool.query(sql, function (err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    res.send(rows);
  });
});

// search functionality

app.get("/recipe_search", function (req, res, next) {
  var sql =
    "SELECT *, Recipe_ingredients.ingredients FROM Recipe LEFT JOIN Recipe_ingredients ON Recipe.recipe_id = Recipe_ingredients.recipe_id WHERE name LIKE '%" +
    pool.escape(req.body.search) +
    "%'";
  // var sql =
  //   "SELECT *, Recipe_ingredients.ingredients FROM Recipe LEFT JOIN Recipe_ingredients ON Recipe.recipe_id = Recipe_ingredients.recipe_id WHERE name LIKE '%mac%'";
  pool.query(sql, function (err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    res.send(rows);
  });
});

// get colletions

app.get("/collections", function (req, res, next) {
  var sql =
    "SELECT Collection.name as c_name, Recipe.name as r_name, * FROM Collection LEFT JOIN Users ON Users.user_id = Collection.user_id JOIN Contains ON Contains.collection_id = Collection.collection_id JOIN Recipe ON Recipe.recipe_id = Contains.recipe_id WHERE Collection.collection_id = Contains.collection_id AND Users.user_id=? ORDER BY Collection.name ASC";
  pool.query(sql, [req.body.id], function (err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    res.send(rows);
  });
});

// get journal

app.get("/journal", function (req, res, next) {
  pool.query(
    "SELECT * FROM Journal JOIN Entry ON Entry.journal_id = Journal.journal_id JOIN Entry_food_eaten ON Entry.entry_id = Entry_food_eaten.entry_id LEFT JOIN Users on Users.user_id = Journal.user_id WHERE Users.user_id=? ORDER BY date_made",
    [req.body.user_id],
    function (err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
      res.send(rows);
    }
  );
});

// user authorization / creation

app.post("/register_user", function (req, res, next) {
  console.log(req.body);
  pool.query(
    "INSERT INTO Users (num_recipes, username, password, display_name, num_collections) VALUES (?, ?, ?, ?, ?)",
    [0, req.body.username, req.body.password, req.body.display_name, 0],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.send({ message: "inserting..." });
    }
  );
});

app.post("/auth_user", function (req, res, next) {
  const options = {
    maxAge: 60 * 60 * 1000, // 1 hour
  };

  // req.body.username = "test";
  // req.body.password = "test";

  pool.query(
    "SELECT * FROM Users WHERE username=? AND password=?",
    [req.body.username, req.body.password],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      console.log(result[0].user_id);
      var id = result[0].user_id;

      res.set({ withCredentials: "true" });
      res.cookie("name", id, options).send({ screen: "user", id: id });
    }
  );
});

app.get("/read_cookie", (req, res) => {
  res.send(req.signedCookies.name);
});

app.get("/clear_cookie", (req, res) => {
  res.clearCookie("name").end();
});

// creating a new recipe

app.post("/new_recipe", function (req, res, next) {
  pool.query(
    "INSERT INTO Recipe (cook_time, category, name, user_id) VALUES (?, ?, ?, ?, ?)",
    [req.body.cook_time, req.body.category, req.body.name, req.body.user_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
    }
  );
  res.sendStatus(200);
});

app.post("/recipe_ingredients", function (req, res, next) {
  pool.query(
    "INSERT INTO Recipe_ingredients (ingredients, recipe_id) VALUES (?, ?)",
    [req.body.ingredients, req.body.recipe_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
    }
  );
  res.sendStatus(200);
});

// updating a recipe

app.post("/update_recipe", function (req, res, next) {
  pool.query(
    "UPDATE Recipe SET ingredients=? WHERE recipe_id=?",
    [req.body.ingredients, req.body.recipe_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
    }
  );
  res.sendStatus(200);

  pool.query(
    "UPDATE Recipe_ingredients SET ingredients=? WHERE recipe_id=?",
    [req.body.ingredients, req.body.recipe_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
    }
  );
  res.sendStatus(200);
});

// creating a new collection

app.post("/new_collection", function (req, res, next) {
  pool.query(
    "INSERT INTO Collection (type, name, date_created, user_id) VALUES (?, ?, ?, ?)",
    [req.body.type, req.body.name, CURDATE(), req.body.user_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
    }
  );

});

app.post("/insert_contains", function (req, res, next) {
  pool.query(
    "INSERT INTO Contains (collection_id, recipe_id) VALUES (?, ?)",
    [req.body.collection_id, req.body.recipe_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
    }
  );
  res.send({ message: "success!" });

// deleting a collection

app.post("/delete_collection", function (req, res, next) {
  pool.query(
    "DELETE FROM Contains WHERE collection_id=?",
    [req.body.collection_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.send({ message: "deleting contains..." });
    }
  );

  pool.query(
    "DELETE FROM Collection WHERE collection_id=? AND user_id=?",
    [req.body.collection_id, req.body.user_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.send({ message: "deleting collection..." });
    }
  );
}); 

// create a new journal 

app.post("/create_journal", function (req, res, next) {
  pool.query(
    "INSERT INTO Journal (date_created, title, num_entries, user_id) VALUES (?, ?, ?)",
    [CURDATE(), req.body.title, 0, req.body.user_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.sendStatus(200);
    }
  );
})

app.post("/create_journal", function (req, res, next) {
  pool.query(
    "INSERT INTO Journal (date_created, title, num_entries, user_id) VALUES (?, ?, ?)",
    [CURDATE(), req.body.title, 0, req.body.user_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.sendStatus(200);
    }
  );
})

// deleting a journal

app.post("/delete_journal", function (req, res, next) {
  pool.query(
    "DELETE FROM Entry_food_eaten WHERE entry_id = (SELECT entry_id from Entry WHERE journal_id=(SELECT journal_id FROM Journal WHERE user_id=?))",
    [req.body.user_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.send({ message: "deleting entries..." });
    }
  );

  pool.query(
    "DELETE FROM Entry WHERE journal_id=(SELECT journal_id FROM Journal WHERE user_id=?)",
    [req.body.user_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.send({ message: "deleting entries..." });
    }
  );

  pool.query(
    "DELETE FROM Journal WHERE user_id=?",
    [req.body.user_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.send({ message: "deleting journal..." });
    }
  );
});

app.use(function (req, res) {
  res.status(404);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type("plain/text");
  res.status(500);
});

app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
