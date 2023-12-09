var express = require("express");
var router = express.Router();
const vendor = require("../controller/VendorController");

/* POST vendor datase */
router.post("/push-dataset", vendor.uploadData);

router.post("/get-ongkir", vendor.getOngkir);

router.post("/recommendation", vendor.getRecommendation);

router.post("/distance-duration", vendor.getDistanceAndDuration);

router.get("/get-province", vendor.getProvince);

router.get("/get-city", vendor.getCity);

module.exports = router;