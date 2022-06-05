const express = require("express");
const router = express.Router();

const { getByResId } = require("../controller/");

//GET ALL CATEGORIES
router.get("/:restaurant_id", getByResId);

module.exports = router;
