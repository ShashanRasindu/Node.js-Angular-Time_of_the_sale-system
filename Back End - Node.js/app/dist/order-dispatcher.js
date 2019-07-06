"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var pool_connection_1 = require("./db/pool-connection");
var util_1 = require("./db/util");
var router = express.Router();
exports.default = router;
router.route("")
    .get(function (req, res) {
    pool_connection_1.Pool.query("SELECT o.id FROM `order` o ORDER BY o.id DESC LIMIT 1", function (err, results) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        console.log(results);
        res.json(results[0].id + 1);
    });
})
    // .post((req, res) => {
    //     if(!(("orderId" in req.body) && ("orderDate" in req.body) && ("customerId" in req.body) && (req.body.orderDetails.length>0)))
    //     {
    //         res.sendStatus(400);
    //         return;
    //     }
    //
    //
    //     Pool.getConnection((err, connection) => {
    //         if (err) {
    //             console.error(err);
    //             res.sendStatus(500);
    //             return;
    //         }
    //
    //         connection.beginTransaction(err1 => {
    //             if (err1) {
    //                 console.error(err1);
    //                 res.sendStatus(500);
    //                 connection.release();
    //                 return;
    //             }
    //             connection.query("INSERT INTO `order` VALUES (?,?,?)",
    //                 [req.body.orderId,req.body.orderDate,req.body.customerId],
    //                 (err2, results) => {
    //                     if (err2 || results.affectedRows === 0) {
    //                         console.error(err2);
    //                         res.sendStatus(500);
    //                         connection.release();
    //                         return;
    //                     }
    //                     const orderDetails: { orderId: string,
    //                         itemCode: string,
    //                         qty: number,
    //                         itemTotalPrice: number }[] = req.body.orderDetails;
    //
    //                     for (let i = 0; i < orderDetails.length; i++) {
    //                         const value = orderDetails[i];
    //                         connection.query("INSERT INTO orderdetail VALUES (?,?,?,?)",
    //                             [value.itemCode,value.orderId, value.qty, value.itemTotalPrice],
    //                             (err3, results1) => {
    //
    //                                 if (err3 || results1.affectedRows === 0) {
    //                                     console.error(err3);
    //                                     res.sendStatus(500);
    //                                     connection.rollback();
    //                                     connection.release();
    //                                     return;
    //                                 }
    //
    //                                 connection.query("UPDATE item SET qtyOnHand=qtyOnHand-? WHERE code=?",
    //                                     [value.qty, value.itemCode], (err4, results2) => {
    //
    //                                         if (err4 || results2.affectedRows === 0) {
    //                                             console.error(err4);
    //                                             res.sendStatus(500);
    //                                             connection.rollback();
    //                                             connection.release();
    //                                             return;
    //                                         }
    //
    //                                         if (i === (orderDetails.length - 1)) {
    //                                             connection.commit();
    //                                             res.status( 201).json({});
    //
    //                                             connection.release();
    //                                         }
    //                                     });
    //
    //
    //                             });
    //                     }
    //                 });
    //         });
    //     });
    //
    //
    // });
    .post(function (req, res) {
    if (!(("orderId" in req.body) && ("orderDate" in req.body) && ("customerId" in req.body) && (req.body.orderDetails.length > 0))) {
        res.sendStatus(400);
        return;
    }
    pool_connection_1.Pool.getConnection(function (err, connection) {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        connection.beginTransaction(function (err1) {
            if (err1) {
                console.error(err1);
                res.sendStatus(500);
                connection.release();
                return;
            }
            placeOrder(connection, req, res);
        });
    });
});
// @ts-ignore
function placeOrder(connection, req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, orderDetails, i, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, util_1.executeQuery(connection, 'INSERT INTO `order` VALUES (?,?,?)', [req.body.orderId, req.body.orderDate, req.body.customerId])];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 0) {
                        connection.rollback();
                        connection.release();
                        res.sendStatus(500);
                        return [2 /*return*/];
                    }
                    orderDetails = req.body.orderDetails;
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < orderDetails.length)) return [3 /*break*/, 6];
                    5;
                    return [4 /*yield*/, util_1.executeQuery(connection, 'INSERT INTO orderdetail VALUES (?,?,?,?)', [orderDetails[i].itemCode,
                            orderDetails[i].orderId,
                            orderDetails[i].qty,
                            orderDetails[i].itemTotalPrice])];
                case 3:
                    result = _a.sent();
                    if (result.affectedRows === 0) {
                        connection.rollback();
                        connection.release();
                        res.sendStatus(500);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, util_1.executeQuery(connection, "UPDATE item SET qtyOnHand = qtyOnHand - ? WHERE code=?", [orderDetails[i].qty, orderDetails[i].itemCode])];
                case 4:
                    result = _a.sent();
                    if (result.affectedRows === 0) {
                        connection.rollback();
                        connection.release();
                        res.sendStatus(500);
                        return [2 /*return*/];
                    }
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 2];
                case 6:
                    connection.commit();
                    connection.release();
                    res.status(201).json({});
                    return [3 /*break*/, 8];
                case 7:
                    e_1 = _a.sent();
                    console.error(e_1);
                    connection.rollback();
                    connection.release();
                    res.sendStatus(500);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
