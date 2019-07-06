"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
exports.Pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    database: "jdbc",
    password: "",
    user: "root",
    connectionLimit: 10
});
