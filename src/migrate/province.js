const Province = require("../models/province");
const lstProvince = require("../jsondata/province.json");

const migrateProvince = async () => {
  let length = 0;

  const createCollege = async (college) => {
    console.log(college.id);
    const collegeModel = new Province({
      name: college.name,
      fake_id: college.id,
    });
    console.log(collegeModel);

    try {
      const savedCollege = await collegeModel.save();
      if (savedCollege) {
        length += 1;
        console.log("Still running: " + length);
      }
      if (length === lstProvince.length) console.log("completed lstProvince");
    } catch (error) {
      console.log(error);
    }
  };

  await Promise.all(lstProvince.map((province) => createCollege(province)));
};

module.exports = migrateProvince;
