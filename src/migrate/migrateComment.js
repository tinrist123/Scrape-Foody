const Province = require("../models/province");
const lstProvince = require("../jsondata/province.json");
const Restaurant = require("../models/restaurant");
const axios = require("axios");
const CommentModel = require("../models/comment");
const migrateComment = async () => {
  let length = 0;
  const callAPIGetDish = async (restaurant_id) => {
    let API_GETALL_RESTAURANT = `https://www.foody.vn/__get/Review/ResLoadMore?t=1654423254690&ResId=${restaurant_id}&LastId=&Count=15&Type=1&fromOwner=&isLatest=true&ExcludeIds=`;
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    return axios(API_GETALL_RESTAURANT)
      .then((res) => {
        if (res.data.Items) {
          return res.data.Items;
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
      lstDishData?.map(async (comment, index) => {
        const menuMongo = new CommentModel({
          restaurant_id: mongoID,
          content: comment.Description,
          title: comment.Title,
          avatar_url: comment.Owner.Avatar,
          display_name: comment.Owner.DisplayName,
          fake_id: comment.Id,
        });
        try {
          const savedMenu = await menuMongo.save();
          if (savedMenu) {
            console.log("System Still Running Comment With ID: " + comment.Id);
          }
        } catch (error) {
          throw "Lưu Comment Lỗi: " + error;
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

module.exports = migrateComment;
