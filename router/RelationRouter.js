var express = require("express");
var router = express.Router();
const relation = require("../controller/RelationController");

/* POST relation dataset */
router.post("/push-dataset", relation.uploadData);

module.exports = router;