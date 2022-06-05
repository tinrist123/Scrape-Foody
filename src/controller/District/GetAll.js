const District = require("../../models/district");

const getallDistrict = async (req, res) => {
  try {
    const allDistrict = await District.find({});

    if (allDistrict) {
      res.status(200).send({
        total: allDistrict.length,
        data: allDistrict,
      });
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

module.exports = getallDistrict;
