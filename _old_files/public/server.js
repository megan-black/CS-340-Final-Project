var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
var mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "classmysql.engr.oregonstate.edu",
  user: "cs340_jianglau",
  password: "6978",
  database: "cs340_jianglau",
});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.argv[2]);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/data", function (req, res, next) {
  var context = {};
  var sqlRows = [];
  pool.query("SELECT * FROM workouts", function (err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    res.send(rows);
  });
});

app.get("/", function (req, res, next) {
  var context = {};
  var sqlRows = [];
  pool.query("SELECT * FROM workouts", function (err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    res.render("home", context);
  });
});

app.post("/", function (req, res, next) {
  console.log("REQUEST PASSED", req.body);
  var context = {};
  pool.query(
    "INSERT INTO workouts (name, reps, weight, date, lbs) VALUES (?, ?, ?, ?, ?)",
    [
      req.body.workout,
      req.body.reps,
      req.body.weight,
      req.body.date,
      req.body.lbs,
    ],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      context.results = "Inserted id " + result.insertId;
    }
  );
  res.render("home", context);
});

app.post("/delete", function (req, res, next) {
  console.log("DELETE", req.body);
  pool.query("DELETE FROM workouts WHERE id=?", [req.body.id], function (
    err,
    result
  ) {
    if (err) {
      console.log("ERROR IN DELETE");
      next(err);
      return;
    }
    res.send({ message: "deleting..." });
  });
});

app.get("/reset-table", function (req, res, next) {
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function (err) {
    var createString =
      "CREATE TABLE workouts(" +
      "id INT PRIMARY KEY AUTO_INCREMENT," +
      "name VARCHAR(255) NOT NULL," +
      "reps INT," +
      "weight INT," +
      "date DATE," +
      "lbs BOOLEAN)";
    pool.query(createString, function (err) {
      context.results = "Table reset";
      res.render("home", context);
    });
  });
});

app.post("/update", function (req, res, next) {
  console.log("IN UPDATE FX", req.body.payload);
  var context = {};
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
      context.results = "Updated " + result.changedRows + " rows.";
      console.log(context.results);
    }
  );
  res.send({ message: context.results });
});

app.use(function (req, res) {
  res.status(404);
  res.render("404");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type("plain/text");
  res.status(500);
  res.render("500");
});

app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
