const express = require("express");
const router = express.Router();

const { GetAllDistrict } = require("../controller/");

//GET ALL CATEGORIES
router.get("/", GetAllDistrict);

module.exports = router;
