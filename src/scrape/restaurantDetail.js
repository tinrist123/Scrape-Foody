// https://gappapi.deliverynow.vn/api/delivery/get_detail?request_id=253751&id_type=1
const fs = require("fs");
const axios = require("axios");
const lstRes = require("../jsondata/user.json");

const config = require("./config");
(async function () {
  let lstAllRestaurantID = lstRes
    .map((res) => res.Items?.map((item) => item.Id))
    .flat();
  let lstRestauntDetail = lstAllRestaurantID
    .slice(1, lstAllRestaurantID.length)
    .map(async (res_id, index) => {
      let promise = new Promise(function (resolve, reject) {
        setTimeout(() => {
          resolve(getRestaurantDetail(res_id));
        }, 500 * index);
      });
      return promise;
    });

  Promise.all(lstRestauntDetail).then((res) => {
    console.log("still running");
    if (res)
      fs.readFile("./results.json", function (err, data) {
        if (err) {
          console.log(err);
          return;
        }
        JSON.stringify(res);
        var json = JSON.parse(data);
        let lstData = [...json];
        lstData.push(res);
        fs.writeFile("./results.json", JSON.stringify(lstData), function (err) {
          if (err) throw err;
          console.log('The "data to append" was appended to file!');
        });
      });
  });
})();

let count = 0;
async function getRestaurantDetail(restaurant_id) {
  let API_GETALL_RESTAURANT = `https://gappapi.deliverynow.vn/api/delivery/get_detail?request_id=${restaurant_id}&id_type=1`;
  axios.defaults.headers.common["x-foody-api-version"] = "1";
  axios.defaults.headers.common["x-foody-app-type"] = "1004";
  axios.defaults.headers.common["x-foody-client-id"] = "";
  axios.defaults.headers.common["x-foody-client-language"] = "vi";
  axios.defaults.headers.common["x-foody-client-type"] = "1";
  axios.defaults.headers.common["x-foody-client-version"] = "1";
  return axios(API_GETALL_RESTAURANT)
    .then((res) => {
      console.log(res.data.result);
      if (res.data.result == "success") return res.data.reply.delivery_detail;
      return "";
    })
    .catch((error) => {
      console.log(error);
      console.log(API_GETALL_RESTAURANT);
      return { id: error };
    });
}
