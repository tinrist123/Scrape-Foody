const roughDistrict = require("../jsondata/districtRough.json");
const fs = require("fs");

let lstDistrict = [];

roughDistrict.data.forEach((rough) => {
  let lstFoodyDistrict = rough.districts;
  lstFoodyDistrict.forEach((district) => {
    let objDistrict = {};
    objDistrict.name = district.name;
    objDistrict.province_id = district.province_id;
    objDistrict.lat = district.latitude;
    objDistrict.lng = district.longitude;
    objDistrict.image_name = district.image_name;
    objDistrict.sort = district.sort;
    objDistrict.id = district.district_id;
    lstDistrict.push(objDistrict);
  });
});

// eslint-disable-next-line prefer-const
const data = JSON.stringify(Array.prototype.concat([], ...lstDistrict));
fs.writeFileSync("./src/jsondata/district.json", data);
