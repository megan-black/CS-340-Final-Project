var mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "classmysql.engr.oregonstate.edu",
  user: "cs340_jianglau",
  password: "6978",
  database: "cs340_jianglau",
});

module.exports.pool = pool;
