const express = require("express");
const router = express.Router();

const { getById, getByIndex } = require("../controller/");

//GET ALL CATEGORIES
router.get("/:restaurant_ID", getById);

// get by index, pageSize
router.get("/", getByIndex);

module.exports = router;
