var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");
var pool = require("./dbcon.js").pool;
var cookieParser = require("cookie-parser");

const port = "56334";

app.set("port", port);
app.use(cookieParser());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.method, req.url, req.body);
  next();
});

app.get("/", function (req, res, next) {
  res.send({ message: "welcome!" });
});

// home page

app.get("/home", function (req, res, next) {
  console.log("home query");
  var sql =
    "SELECT Collection.name as c_name, Recipe.name as r_name, category, cook_time, date_created FROM Collection JOIN Contains ON Collection.collection_id = Contains.collection_id JOIN Recipe ON Contains.recipe_id = Recipe.recipe_id WHERE Collection.collection_id = Contains.collection_id LIMIT 4;";
  pool.query(sql, function (err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    res.send(rows);
  });
});

// get all recipes
//
app.get("/recipes", function (req, res, next) {
  var sql =
    "SELECT * FROM Recipe LEFT JOIN Recipe_ingredients using (recipe_id)";
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
    "SELECT *, Recipe_ingredients.ingredients FROM Recipe LEFT JOIN Recipe_ingredients ON Recipe.recipe_id = Recipe_ingredients.recipe_id WHERE name LIKE ?";
  pool.query(sql, "%" + req.query.search + "%", function (err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    res.send(rows);
  });
});

// get colletions

app.post("/collections", function (req, res, next) {
  var sql =
    "SELECT * FROM Collection LEFT JOIN Users using (`user_id`) LEFT JOIN Contains using (`collection_id`) WHERE user_id=?";
  pool.query(sql, [req.body.id], function (err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    res.send(rows);
  });
});

// get journal

app.post("/journal", function (req, res, next) {
  pool.query(
    "SELECT * FROM Journal WHERE user_id=?",
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

// get entry

app.post("/entry", function (req, res, next) {
  pool.query(
    "SELECT * FROM Entry WHERE journal_id = (SELECT journal_id FROM Journal WHERE user_id=?)",
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

// HANDLING ENTRIES

app.post("/get_journal_id", function (req, res, next) {
  var journal_id = -1;
  pool.query(
    "SELECT journal_id FROM Journal WHERE user_id=?",
    req.body.user_id,
    function (err, rows) {
      if (err) {
        next(err);
        return;
      }
      console.log(rows[0].journal_id);
      res.send({ id: rows[0].journal_id });
    }
  );
});

app.post("/create_entry", function (req, res, next) {
  pool.query(
    "INSERT INTO Entry (date_made, journal_id, food_eaten) VALUES (?, (SELECT journal_id from Journal WHERE user_id=?), ?)",
    [new Date(), req.body.user_id, req.body.food_eaten],
    function (err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
      res.send(rows);
    }
  );
});

app.post("/update_entry", function (req, res, next) {
  pool.query(
    "UPDATE Entry SET food_eaten=? WHERE entry_id=?",
    [req.body.food_eaten, req.body.entry_id],
    function (err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
      res.send(rows);
    }
  );
});

app.post("/delete_entry", function (req, res, next) {
  pool.query(
    "DELETE FROM Entry WHERE entry_id=?",
    [req.body.entry_id],
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

// HANDLING RECIPES

app.post("/new_recipe", function (req, res, next) {
  pool.query(
    "INSERT INTO Recipe (cook_time, category, name, user_id) VALUES (?, ?, ?, ?)",
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

app.post("/add_recipe_ingredients", function (req, res, next) {
  pool.query(
    "INSERT INTO Recipe_ingredients (ingredients, recipe_id) VALUES (?, (SELECT recipe_id FROM Recipe WHERE name=?))",
    [req.body.ingredients, req.body.name],
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
app.post("/check_ingredients", function (req, res, next) {
  pool.query(
    "SELECT * FROM Recipe_ingredients WHERE recipe_id=?",
    [req.body.recipe_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.send(result);
    }
  );
});

app.post("/update_recipe", function (req, res, next) {
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

app.post("/delete_ingredients", function (req, res, next) {
  pool.query(
    "DELETE FROM Recipe_ingredients WHERE recipe_id=?",
    [req.body.recipe_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.sendStatus(200);
    }
  );
});

app.post("/delete_recipe", function (req, res, next) {
  pool.query(
    "DELETE FROM Recipe WHERE recipe_id=?",
    [req.body.recipe_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.sendStatus(200);
    }
  );
});

// adding/removing from a m-m relationship

app.post("/add_contains", function (req, res, next) {
  pool.query(
    "INSERT INTO Contains (recipe_id, collection_id) VALUES (?,?)",
    [req.body.recipe_id, req.body.collection_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.sendStatus(200);
    }
  );
});

app.post("/remove_contains", function (req, res, next) {
  pool.query(
    "DELETE FROM Contains WHERE recipe_id=? AND collection_id=?",
    [req.body.recipe_id, req.body.collection_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.sendStatus(200);
    }
  );
});

// COLLECTIONS PAGE!

app.post("/recipes_collection", function (req, res, next) {
  pool.query(
    "SELECT * FROM Contains JOIN Recipe using (`recipe_id`) JOIN Recipe_ingredients using (`recipe_id`) WHERE collection_id = (SELECT collection_id FROM Collection WHERE user_id=?)",
    [req.body.user_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.send(result);
    }
  );
});

// creating a new collection

app.post("/new_collection", function (req, res, next) {
  pool.query(
    "INSERT INTO Collection (type, name, date_created, user_id, numrecipes) VALUES (?, ?, ?, ?, ?)",
    [req.body.type, req.body.name, new Date(), req.body.user_id, 0],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.send({ message: "success!" });
    }
  );
});

// deleting a collection

app.post("/delete_contains", function (req, res, next) {
  pool.query(
    "DELETE FROM Contains WHERE collection_id=?",
    [req.body.collection_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.send({ message: "deleting..." });
    }
  );
});

app.post("/delete_collection", function (req, res, next) {
  pool.query(
    "DELETE FROM Collection WHERE collection_id=? AND user_id=?",
    [req.body.collection_id, req.body.user_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.send({ message: "deleting..." });
    }
  );
});

// creating journal

app.post("/create_journal", function (req, res, next) {
  pool.query(
    "INSERT INTO Journal (date_created, title, num_entries, user_id) VALUES (?, ?, ?, ?)",
    [new Date(), req.body.title, 0, req.body.user_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.sendStatus(200);
    }
  );
});

// deleting a journal

app.post("/delete_journal", function (req, res, next) {
  pool.query(
    "DELETE FROM Entry WHERE journal_id=(SELECT journal_id FROM Journal WHERE user_id=?)",
    [req.body.user_id],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
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
