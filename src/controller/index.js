const GetAllDistrict = require("./District/GetAll");
const GetAllProvince = require("./Province/GetAll");
const getByResId = require("./menu/getByResId");
const GetByRestaurantId = require("./MenuDetail/GetByRestaurantId");
const getById = require("./restaurant/getById");
const getByIndex = require("./restaurant/getByIndex");
const GetByRestaurantID = require("./comment/GetByRestaurantID");
const getRecommendRestaurant = require("./restaurant/getRecommend");


module.exports = {
  GetAllDistrict,
  GetAllProvince,
  getByResId,
  getById,
  GetByRestaurantId,
  getByIndex,
  GetByRestaurantID,
  getRecommendRestaurant
};
