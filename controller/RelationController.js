const Relation = require("../models/RelationModel");
const dataset = require("../dataset/relation.json");
const uploadData = async (req, res) => {
  try {
    await dataset.forEach(async (element) => {
      await Relation.create([
        {
          custNum: element.custNum,
          address: element.address,
          state: element.state,
          city: element.city,
          province: element.province,
          zipCode: element.zipCode,
          latitude: element.latitude,
          longitude: element.longitude,
        },
      ]);
    });
    res.formatter.ok("Upload data done");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error" });
  }
};

module.exports = {
  uploadData,
};