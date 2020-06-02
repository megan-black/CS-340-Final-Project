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
    "SELECT * FROM Collection JOIN Contains ON Collection.collection_id = Contains.collection_id JOIN Recipe ON Contains.recipe_id = Recipe.recipe_id WHERE Collection.collection_id = Contains.collection_id LIMIT 4;";
  pool.query(sql, function (err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    console.log("home query!!");
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
    "SELECT * FROM Collection LEFT JOIN Users ON Users.user_id = Collection.user_id JOIN Contains ON Contains.collection_id = Collection.collection_id JOIN Recipe ON Recipe.recipe_id = Contains.recipe_id WHERE Collection.collection_id = Contains.collection_id AND Users.user_id=8 ORDER BY Collection.name ASC";
  pool.query(sql, function (err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    res.send(rows);
  });
});

// get journal

app.get("/journal", function (req, res, next) {
  var keyword = req.body.search;
  var sql =
    "SELECT * FROM Journal JOIN Entry ON Entry.journal_id = Journal.journal_id JOIN Entry_food_eaten ON Entry.entry_id = Entry_food_eaten.entry_id LEFT JOIN Users on User.user_id = Journal.user_id WHERE user_id = 2 ORDER BY date_made" +
    mysql.escape(req.body.search) +
    "%";
  pool.query(sql, function (err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    res.send(rows);
  });
});

// user authorization / creation

app.post("/register_user", function (req, res, next) {
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

app.get("/auth_user", function (req, res, next) {
  const options = {
    maxAge: 60 * 60 * 1000, // 1 hour
    httpOnly: true,
    secure: true,
    sameSite: true,
  };

  req.body.username = "test";
  req.body.password = "test";

  pool.query(
    "SELECT * FROM Users WHERE username=? AND password=?",
    [req.body.username, req.body.password],
    function (err, result) {
      if (err) {
        console.log("ERROR IN DELETE");
        next(err);
        return;
      }
      console.log(result[0].user_id);
      var id = result[0].user_id;
      res.cookie("name", id, options).send({ screen: "user" });
    }
  );
});

app.get("/clear-cookie", (req, res) => {
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

// creating a new collection

app.post("/new_collection", function (req, res, next) {
  pool.query(
    "UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
    [
      req.body.payload.name,
      req.body.payload.reps,
      req.body.payload.weight,
      req.body.payload.date,
      req.body.payload.unit,
      req.body.payload.id,
    ],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
    }
  );
  res.send({ message: context.results });
});

// deleting a collection

app.post("/delete_collection", function (req, res, next) {
  pool.query(
    "DELETE FROM Collection WHERE collection_id=?",
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

// deleting a journal

app.post("/delete_journal", function (req, res, next) {
  pool.query("DELETE FROM Journal WHERE user_id=?", [req.body.id], function (
    err,
    result
  ) {
    if (err) {
      next(err);
      return;
    }
    res.send({ message: "deleting..." });
  });
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
