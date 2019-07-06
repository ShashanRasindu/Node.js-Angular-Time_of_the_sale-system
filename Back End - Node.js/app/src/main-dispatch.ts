import express = require("express");
import cros = require("cors");

import customer from "./customer-dispatch";
import item from "./item-dispatcher";
import order from "./order-dispatcher";

const router = express.Router();

export default router;


router.use(express.json());
router.use(cros());

router.use("/api/v1/customers", customer);
router.use("/api/v1/items", item);
router.use("/api/v1/oders", order);





