var express = require("express");
var router = express.Router();
const user = require("../../controllers/whitesoft.controller");

router.get("/all", user.findAll);

module.exports = router;
