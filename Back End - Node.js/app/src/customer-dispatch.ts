
import express = require("express");
import {Pool} from "./db/pool-connection";


const router=express.Router();
export default router;



router.route("")

.head( (req, res) => {

    Pool.query("SELECT COUNT(*) AS countCus FROM customer", (err, results) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.setHeader("X-count", results[0].countCus);
        res.end();
    });
})


.get( (req, res, next) => {

    if ("page" in req.query && "size" in req.query){

        const page = +req.query.page;
        const size = +req.query.size;

        Pool.query("SELECT * FROM customer LIMIT ?,?",[page*size,size],(err, results) => {
            if (err){
                res.sendStatus(500);
                return;
            }
            Pool.query("SELECT COUNT(*) AS countCus FROM customer",(err1, results1) => {
                if (err1) {
                    res.sendStatus(500);
                    return
                }
                res.json(new CustomerPage([],results,{number: page,
                    size:size,
                    totalElements:results1[0].countCus,
                    totalPages: results1[0].countCus / size
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


.get((req, res)=>{
    Pool.query("SELECT * FROM customer", (err, results) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json(results);
    });
})

.post((req, res) => {
    if (!(("id" in req.body) && ("name" in req.body) && ("address" in req.body))) {
        res.sendStatus(400);
        return;
    }

    let sql = "INSERT INTO customer VALUES (?,?,?)";
    // sql = Pool.format(sql, [req.body.id, req.body.name, req.body.address]);
    Pool.query(sql,[req.body.id, req.body.name, req.body.address],
        (err, results) => {
            console.log(results);
            if (err) {
                console.error(err);
                res.sendStatus(500);
                return;
            }
            res.status(results.affectedRows > 0 ? 201 : 500).json({});
        });
});



router.route("/:id(C\\d{3})")
.get( (req, res) => {
    let sql = "SELECT * FROM customer WHERE  id=?";
    // sql = Pool.format(sql, [req.params.id]);



    // connection.query(`SELECT * FROM customer WHERE  id='${req.params.id}'`,(err, results) => {
    //     if (err) {
    //         console.log(err);
    //         res.sendStatus(500);
    //         return;
    //     }
    //     res.json(results);
    // });
    Pool.query(sql,[req.params.id], (err, results) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.sendStatus(404);
        }
    });

})



.put( (req, res) => {
    let sql = "UPDATE customer SET name=?,address=? WHERE  id=?";
    // sql = Pool.format(sql, [req.body.name, req.body.address, req.params.id]);
    Pool.query(sql,[req.body.name, req.body.address, req.params.id], (err, results) => {
        console.log(results);
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        res.status(results.changedRows > 0 ? 201 : 500).json({});
    });

})
.delete((req, res) => {
    let sql = "DELETE FROM customer WHERE  id=?";
    // sql = Pool.format(sql, [req.params.id]);

    Pool.query(sql,[req.params.id], (err, results) => {
        console.log(results);
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }

        res.status(results.affectedRows == 0 ? 500 : 201).json({});

    });
});




export class CustomerPage {
    links: { rel: string, href: string }[];
    content: [];
    page: {
        size: number,
        totalElements: number,
        totalPages: number,
        number: number
    };
    constructor(links: { rel: string; href: string }[], content: [], page: { size: number; totalElements: number; totalPages: number; number: number }) {
        this.links = links;
        this.content = content;
        this.page = page;
    }
}