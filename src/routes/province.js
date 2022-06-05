const express = require("express");
const router = express.Router();

const { GetAllProvince } = require("../controller/");

//GET ALL CATEGORIES
router.get("/", GetAllProvince);

module.exports = router;
