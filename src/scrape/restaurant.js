const fs = require("fs");
const axios = require("axios");
const lstProvince = require("../jsondata/province.json");
const lstDistrict = require("../jsondata/district.json");

let lat = 10.823099;
let lng = 106.629664;
let districtId = 4;

let API_GETDETAIL_RESTAURANT = `https://gappapi.deliverynow.vn/api/delivery/get_detail?request_id=${931829}&id_type=1`;
let lstId = [];
(async function () {
  // lấy all ID của nhà hàng theo cặp province -lstDistrict
  lstProvince.forEach((province) => {
    let lstAllDistrict = lstDistrict.filter(
      (obj) => (obj.province_id = province.id)
    );

    let lstRestaunt = lstAllDistrict.map((district, index) => {
      let promise = new Promise(function (resolve, reject) {
        setTimeout(() => {
          resolve(getRestaunrantID(district));
        }, 250 * index);
      });
      return promise;
    });

    Promise.all(lstRestaunt).then((res) => console.log(res));
    // Promise.all(lstRestaunt).then((restaurant) => {
    //   console.log(restaurant);
    //   //   fs.writeFile("./user.json", JSON.stringify(product), "utf8", (err) => {
    //   //     if (err) {
    //   //       console.log(`Error writing file: ${err}`);
    //   //     } else {
    //   //       console.log(`File is written successfully!`);
    //   //     }
    //   //   });
    //   // console.log(product);
    // });

    // lstAllDistrict.forEach(async (district) => {
    //   lat = district.lat;
    //   lng = district.lng;
    //   districtId = district.id;
    //   let API_GETALL_RESTAURANT = `https://www.foody.vn/__get/Place/HomeListPlace?t=${new Date().getTime()}&page=1&lat=${lat}&lon=${lng}&count=${12}&districtId=${districtId}&cateId=&cuisineId=&isReputation=&type=1`;
    //   axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    //   const response = await axios(API_GETALL_RESTAURANT);
    //   const data = response.data;
    //   if (data) {
    //     if (data.Items) {
    //       data.Items.map((obj) => {
    //         console.log(obj);
    //         lstId.push(obj.Id);
    //       });
    //     }
    //   }
    // });

    // gọi API lấy thông tỉnh nhà hàng theo district
  });
  // eslint-disable-next-line prefer-const
  //   const data = JSON.stringify(Array.prototype.concat([], ...[]));
  //   fs.writeFileSync("./src/backup/data/College.json", data);
})();

// console.log(await getProductDetailFromTiki(lstProductID[0]));

async function getRestaunrantID(district) {
  lat = district.lat;
  lng = district.lng;
  districtId = district.id;
  let API_GETALL_RESTAURANT = `https://www.foody.vn/__get/Place/HomeListPlace?t=${new Date().getTime()}&page=1&lat=${lat}&lon=${lng}&count=${12}&districtId=${districtId}&cateId=&cuisineId=&isReputation=&type=1`;
  axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
  return axios(API_GETALL_RESTAURANT)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("error", districtId);
      return { id: error };
    });
}
