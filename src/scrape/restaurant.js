const lstProvince = require("../jsondata/province.json");
const lstDistrict = require("../jsondata/district.json");

let lat = 10.823099;
let lng = 106.629664;
let districtId = 4;

let API_GETDETAIL_RESTAURANT = `https://gappapi.deliverynow.vn/api/delivery/get_detail?request_id=${931829}&id_type=1`;
let lstId = [];
(async function () {
  // lấy all ID của nhà hàng theo cặp province -lstDistrict
  let lstProvinceTemp = lstProvince.filter(
    (obj) => obj.id == 217 || obj.id == 218
  );
  lstProvinceTemp.forEach((province) => {
    let lstAllDistrict = lstDistrict.filter(
      (obj) => obj.province_id == province.id
    );
    console.log(lstAllDistrict);
    let lstRestaunt = lstAllDistrict.map((district, index) => {
      let promise = new Promise(function (resolve, reject) {
        setTimeout(() => {
          resolve(getRestaunrantID(district));
        }, 1000 * index);
      });
      return promise;
    });

    Promise.all(lstRestaunt).then((res) => {
      console.log("still running");
      fs.readFile("./user.json", function (err, data) {
        JSON.stringify(res);
        var json = JSON.parse(data);
        let lstData = [...json];
        lstData.push(res);
        fs.writeFile("./user.json", JSON.stringify(lstData), function (err) {
          if (err) throw err;
          console.log('The "data to append" was appended to file!');
        });
      });
    });
  });
})();

// console.log(await getProductDetailFromTiki(lstProductID[0]));
async function getRestaunrantID(district) {
  lat = district.lat;
  lng = district.lng;
  districtId = district.id;
  let API_GETALL_RESTAURANT = `https://www.foody.vn/__get/Place/HomeListPlace?t=${new Date().getTime()}&page=1&lat=${lat}&lon=${lng}&count=${12}&districtId=${districtId}&cateId=&cuisineId=&isReputation=&type=1`;
  axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
  let cookie = "";
  if (district.province_id == 218) cookie = config.cookieHaNoi;
  if (district.province_id == 217) cookie = config.cookieHCM;
  axios.defaults.headers.common["Cookie"] = cookie;
  return axios(API_GETALL_RESTAURANT)
    .then((res) => {
      console.log(res.data.CityId);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      console.log(API_GETALL_RESTAURANT);
      return { id: error };
    });
}
