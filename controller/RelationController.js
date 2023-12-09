const Relation = require("../models/RelationModel");
const dataset = require("../dataset/relation.json");
const uploadData = async (req, res) => {
  try {
    await dataset.forEach(async (element) => {
      await Relation.create([
        {
          kodeCabang: element.KODE_CABANG,
          custNum: element.CUSTOMER_NUMBER,
          address: element.ALAMAT,
          state: element.STATE,
          city: element.CITY,
          province: element.PROVINCE,
          zipCode: element.ZIP_CODE,
          latitude: element.LATITUDE,
          longitude: element.LONGITUDE,
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