"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var pool_connection_1 = require("./db/pool-connection");
var router = express.Router();
exports.default = router;
router.route("")
    .get(function (req, res, next) {
    if ("page" in req.query && "size" in req.query) {
        var page_1 = +req.query.page;
        var size_1 = +req.query.size;
        pool_connection_1.Pool.query("SELECT * FROM item LIMIT ?,?", [page_1 * size_1, size_1], function (err, results) {
            if (err) {
                res.sendStatus(500);
                return;
            }
            pool_connection_1.Pool.query("SELECT COUNT(*) AS countCus FROM item", function (err1, results1) {
                if (err1) {
                    res.sendStatus(500);
                    return;
                }
                res.json(new ItemPage([], results, { number: page_1,
                    size: size_1,
                    totalElements: results1[0].countCus,
                    totalPages: results1[0].countCus / size_1
                }));
            });
        });
    }
    else {
        next();
    }
    // Pool.query("SELECT * FROM customer", (err, results) => {
    //     if (err) {
    //         console.log(err);
    //         res.sendStatus(500);
    //         return;
    //     }
    //     res.json(results);
    // });
})
    .get(function (req, res) {
    pool_connection_1.Pool.query("SELECT * FROM item", function (err, results) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json(results);
    });
})
    .post(function (req, res) {
    if (!(("code" in req.body) && ("description" in req.body) && ("unitPrice" in req.body) && ("qtyOnHand" in req.body))) {
        res.sendStatus(400);
        return;
    }
    var sql = "INSERT INTO item VALUES (?,?,?,?)";
    // sql = Pool.format(sql, [req.body.id, req.body.name, req.body.address]);
    pool_connection_1.Pool.query(sql, [req.body.code, req.body.description, req.body.unitPrice, req.body.qtyOnHand], function (err, results) {
        console.log(results);
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        res.status(results.affectedRows > 0 ? 201 : 500).json({});
    });
});
router.route("/:code(I\\d{3})")
    .get(function (req, res) {
    var sql = "SELECT * FROM item WHERE  code=?";
    // sql = Pool.format(sql, [req.params.id]);
    // connection.query(`SELECT * FROM customer WHERE  id='${req.params.id}'`,(err, results) => {
    //     if (err) {
    //         console.log(err);
    //         res.sendStatus(500);
    //         return;
    //     }
    //     res.json(results);
    // });
    pool_connection_1.Pool.query(sql, [req.params.code], function (err, results) {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        }
        else {
            res.sendStatus(404);
        }
    });
})
    .put(function (req, res) {
    var sql = "UPDATE item SET description=?,unitPrice=?,qtyOnHand=? WHERE  code=?";
    // sql = Pool.format(sql, [req.body.name, req.body.address, req.params.id]);
    pool_connection_1.Pool.query(sql, [req.body.description, req.body.unitPrice, req.body.qtyOnHand, req.params.code], function (err, results) {
        console.log(results);
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        res.status(results.changedRows > 0 ? 201 : 500).json({});
    });
})
    .delete(function (req, res) {
    var sql = "DELETE FROM item WHERE  code=?";
    // sql = Pool.format(sql, [req.params.id]);
    pool_connection_1.Pool.query(sql, [req.params.code], function (err, results) {
        console.log(results);
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        res.status(results.affectedRows == 0 ? 500 : 201).json({});
    });
});
var ItemPage = /** @class */ (function () {
    function ItemPage(links, content, page) {
        this.links = links;
        this.content = content;
        this.page = page;
    }
    return ItemPage;
}());
exports.ItemPage = ItemPage;
