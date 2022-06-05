const Restaurant = require("../models/restaurant");
const ProvinceModel = require("../models/province");
const DistrictModel = require("../models/district");
const lstRestaurant = require("../jsondata/results.json");

const migrateRestaurant = async () => {
  let length = 0;
  const createRestaurant = async (restaurant) => {
    // kiem id foreign
    if (!restaurant) return;
    // let foreignKey = await findProvinceBelongTo(district.province_id);

    // if (!foreignKey) return;
    let available_times = [];
    let avgRating = 0.0;
    let phone = "";
    let photo = [];
    if (restaurant.available_times) {
      if (restaurant.available_times.length > 0) {
        available_times = restaurant.available_times[0].times;
      }
    }

    if (restaurant.rating) {
      avgRating = restaurant.rating.avg;
    }

    if (restaurant.res_photos) {
      if (restaurant.res_photos.length > 0) {
        photo = restaurant.res_photos.map((obj) =>
          obj.photos.map((photo) => ({
            width: photo.width,
            value: photo.value,
            height: photo.height,
          }))
        );
      }
    }
    // console.log(photo);

    if (restaurant.phones?.length > 0) {
      phone = restaurant.phones[0];
    }

    let province_id = await findProvinceBelongTo(restaurant.city_id);
    let district_id = await findDistrictBelongTo(restaurant.district_id);
    if (!province_id) {
      throw "Lỗi cmnr";
    }
    if (!district_id) throw "Lỗi cmnr";
    // let lstDishOfRes = await callAPIGetDish(restaurant.id);
    const restaurantModel = new Restaurant({
      name: restaurant.name,
      address_detail: restaurant.address,
      open_time: available_times,
      rating: avgRating,
      phone: phone,
      short_description: restaurant.short_description,
      photos: [...photo],
      lat: restaurant.position?.latitude,
      lng: restaurant.position?.longitude,
      fake_id: restaurant.restaurant_id,
      price_range: [restaurant.min_order_value?.text],
      province_id,
      district_id,
    });
    try {
      const savedCollege = await restaurantModel.save();
      if (savedCollege) {
        length += 1;
        console.log("still running + " + length);
      }
      if (length === lstRestaurant.length)
        console.log("completed lstRestaurant");
    } catch (error) {
      console.log(error);
    }
  };

  const findProvinceBelongTo = async (province_id) => {
    const provinceDB = await ProvinceModel.findOne({
      fake_id: province_id,
    });
    if (provinceDB) return provinceDB._id;

    return "";
  };

  const findDistrictBelongTo = async (district_id) => {
    const provinceDB = await DistrictModel.findOne({
      fake_id: district_id,
    });
    if (provinceDB) return provinceDB._id;
    return "";
  };

  await Promise.all(
    lstRestaurant.map((restaurant) => createRestaurant(restaurant))
  );
};

module.exports = migrateRestaurant;
