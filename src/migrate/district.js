const District = require("../models/district");
const ProvinceModel = require("../models/province");
const lstDistrict = require("../jsondata/district.json");

const migrateDistrict = async () => {
  let length = 0;

  const createCollege = async (district) => {
    // kiem id foreign

    let foreignKey = await findProvinceBelongTo(district.province_id);

    if (!foreignKey) return;

    const collegeModel = new District({
      name: district.name,
      fake_id: district.id,
      province_id: foreignKey,
    });
    try {
      const savedCollege = await collegeModel.save();
      if (savedCollege) {
        length += 1;
        console.log("Still Running District With index: " + length);
      }
      if (length === lstDistrict.length) console.log("completed lstDistrict");
    } catch (error) {
      console.log(district);
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

  await Promise.all(lstDistrict.map((district) => createCollege(district)));
};

module.exports = migrateDistrict;
