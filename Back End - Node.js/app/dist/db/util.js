"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function executeQuery(connection, sql, values) {
    // @ts-ignore
    return new Promise(function (resolve, reject) {
        connection.query(sql, values, function (err, results) {
            if (err) {
                reject(err);
            }
            else {
                resolve(results);
            }
        });
    });
}
exports.executeQuery = executeQuery;
