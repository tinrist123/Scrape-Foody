const GetAllDistrict = require("./District/GetAll");
const GetAllProvince = require("./Province/GetAll");
const getByResId = require("./menu/getByResId");
const GetByRestaurantId = require("./MenuDetail/GetByRestaurantId");
const getById = require("./restaurant/getById");
const getByIndex = require("./restaurant/getByIndex");
const GetByRestaurantID = require("./comment/GetByRestaurantID");
const getRecommendRestaurant = require("./restaurant/getRecommend");
const searchRestaurant = require("./restaurant/searchRestaurant");
const getNearlyRestaurant = require("./restaurant/getNearlyRestaurant");
const getMostViewRestaurant = require("./restaurant/getMostViewRestaurant")

module.exports = {
  GetAllDistrict,
  GetAllProvince,
  getByResId,
  getById,
  GetByRestaurantId,
  getByIndex,
  GetByRestaurantID,
  getRecommendRestaurant,
  searchRestaurant,
  getNearlyRestaurant,
  getMostViewRestaurant
};
