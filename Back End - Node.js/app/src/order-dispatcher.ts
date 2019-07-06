import express = require("express");
import {Pool} from "./db/pool-connection";
import {executeQuery} from "./db/util";
import {PoolConnection} from "mysql";
import {Request, Response} from "express";
const router=express.Router();
export default router;

router.route("")
    .get((req, res) => {
        Pool.query("SELECT o.id FROM `order` o ORDER BY o.id DESC LIMIT 1",(err, results) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            console.log(results);
            res.json(results[0].id +1);
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


    .post((req, res) => {

        if(!(("orderId" in req.body) && ("orderDate" in req.body) && ("customerId" in req.body) && (req.body.orderDetails.length>0)))
         {
        res.sendStatus(400);
        return;
            }
        Pool.getConnection((err, connection) => {

            if (err) {
                console.error(err);
                res.sendStatus(500);
                return;
            }

            connection.beginTransaction(err1 => {

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
async function placeOrder(connection: PoolConnection, req: Request, res: Response) {

    try {

        let result = await executeQuery(connection, 'INSERT INTO `order` VALUES (?,?,?)',
            [req.body.orderId,req.body.orderDate,req.body.customerId]);

        if (result.affectedRows === 0) {
            connection.rollback();
            connection.release();
            res.sendStatus(500);
            return;
        }

        const orderDetails: {
            orderId: string,
            itemCode: string,
            qty: number,
            itemTotalPrice: number
        }[] = req.body.orderDetails;

        for (let i = 0; i < orderDetails.length; i++) {
            5;
            result = await executeQuery(connection, 'INSERT INTO orderdetail VALUES (?,?,?,?)',
                [orderDetails[i].itemCode,
                    orderDetails[i].orderId,
                    orderDetails[i].qty,
                    orderDetails[i].itemTotalPrice]);

            if (result.affectedRows === 0) {
                connection.rollback();
                connection.release();
                res.sendStatus(500);
                return;
            }

            result = await executeQuery(connection, "UPDATE item SET qtyOnHand = qtyOnHand - ? WHERE code=?",
                [orderDetails[i].qty, orderDetails[i].itemCode]);

            if (result.affectedRows === 0) {
                connection.rollback();
                connection.release();
                res.sendStatus(500);
                return;
            }

        }

        connection.commit();
        connection.release();
        res.status(201).json({});

    } catch (e) {
        console.error(e);
        connection.rollback();
        connection.release();
        res.sendStatus(500);
    }
}
