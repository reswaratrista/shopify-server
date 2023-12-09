var express = require("express");
var router = express.Router();
const vendor = require("../controller/VendorController");

/* POST vendor datase */
router.post("/push-dataset", vendor.uploadData);

router.get("/get-ongkir", vendor.getRate);

module.exports = router;