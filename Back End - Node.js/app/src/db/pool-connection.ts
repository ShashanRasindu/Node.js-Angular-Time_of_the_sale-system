
import mysql = require("mysql");

export const Pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    database: "jdbc",
    password: "",
    user: "root",
    connectionLimit: 10
});