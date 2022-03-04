const mysql = require("mysql2/promise"); // promise so that it works async

const pool = mysql.createPool({
  host: "localhost",
  database: "blog",
  user: "root",
  password: "!som1%eof2a&poo1(patro4opa",
}); // creates a pool of connections to the database, connecting to the host ie localhost, our blog database, and the default root user, pass etc.

module.exports = pool;
