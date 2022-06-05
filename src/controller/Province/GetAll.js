const Province = require("../../models/province");

const getallProvince = async (req, res) => {
  try {
    const allProvince = await Province.find({});

    if (allProvince) {
      res.status(200).send({
        total: allProvince.length,
        data: allProvince,
      });
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

module.exports = getallProvince;
