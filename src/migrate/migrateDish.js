const Province = require("../models/province");
const lstProvince = require("../jsondata/province.json");
const Restaurant = require("../models/restaurant");
const axios = require("axios");
const MenuModel = require("../models/menu");
const MenuDetailModel = require("../models/menu_detail");
const migrateDish = async () => {
  let length = 0;
  const callAPIGetDish = async (restaurant_id) => {
    let API_GETALL_RESTAURANT = `https://gappapi.deliverynow.vn/api/dish/get_delivery_dishes?request_id=${restaurant_id}&id_type=1`;
    axios.defaults.headers.common["x-foody-api-version"] = "1";
    axios.defaults.headers.common["x-foody-app-type"] = "1004";
    axios.defaults.headers.common["x-foody-client-id"] = "";
    axios.defaults.headers.common["x-foody-client-language"] = "vi";
    axios.defaults.headers.common["x-foody-client-type"] = "1";
    axios.defaults.headers.common["x-foody-client-version"] = "1";
    return axios(API_GETALL_RESTAURANT)
      .then((res) => {
        if (res.data.result == "success") {
          return res.data.reply.menu_infos;
        }
        throw "Lỗi gọi API luôn nè " + restaurant_id;
        return "";
      })
      .catch((error) => {
        console.log(error);
        console.log(API_GETALL_RESTAURANT);
        return "";
      });
  };
  // lấy all restaurant
  try {
    const result = await Restaurant.find();
    const lstRestaurantID = result.map((obj) => `${obj.fake_id}_${obj._id}`);
    lstRestaurantID.map(async (restaurant_id, index) => {
      let splitData = restaurant_id.split("_");
      let fake_id = splitData[0];
      let mongoID = splitData[1];
      let lstDishData = await callAPIGetDish(fake_id);
      console.log("Still Running with RetaurantIndex: " + index);
      lstDishData.map(async (menu, index) => {
        let menuMongoID = "";
        const menuMongo = new MenuModel({
          restaurant_id: mongoID,
          name: menu.dish_type_name,
          fake_id: menu.dish_type_id,
        });
        try {
          const savedMenu = await menuMongo.save();
          if (savedMenu) {
            console.log(
              "System Still Running Menu With ID: " + menu.dish_type_id
            );
            menuMongoID = savedMenu?._id;
          }
          if (menuMongoID) {
            // xử lý menuDetail
            menu.dishes.map(async (dish) => {
              const menuDetailMongo = new MenuDetailModel({
                menu_id: menuMongoID,
                name: dish.name,
                description: dish.description,
                price: dish.price.text,
                discount_price: dish.discount_price
                  ? dish.discount_price.text
                  : "0",
                photo: dish.photos.map((pho) => pho.value),
                fake_id: dish.id,
              });

              const savedMenuDetailMongo = await menuDetailMongo.save();

              if (savedMenuDetailMongo) {
                console.log(
                  "System Still Running MenuDetail With ID: " + dish.id
                );
              } else {
                throw "Lỗi với ID: " + dish.id;
              }
            });
          }
        } catch (error) {
          throw "Lưu Menu Lỗi: " + error;
        }
      });
    });
  } catch (error) {
    console.log(error);
  }

  //   const createDish = async (college) => {
  //     console.log(college.id);
  //     const collegeModel = new Province({
  //       name: college.name,
  //       fake_id: college.id,
  //     });
  //     console.log(collegeModel);

  //     try {
  //       const savedCollege = await collegeModel.save();
  //       if (savedCollege) {
  //         length += 1;
  //       }
  //       if (length === lstProvince.length) console.log("completed lstProvince");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   await Promise.all(lstProvince.map((province) => createDish(province)));
};

module.exports = migrateDish;
