var express = require("express");
var router = express.Router();
const user = require("../../controllers/whitesoft.controller");

router.post("/", user.create);

module.exports = router;
