var express = require("express");
var router = express.Router();
const transaction = require("../controller/TransactionController");

/* POST transaction dataset */
router.post("/push-dataset", transaction.uploadData);

router.get("/get", transaction.getTransaction);

router.get("/getOngkir/:transactionId", transaction.getOngkir);

router.post("/assign", transaction.assign);

module.exports = router;