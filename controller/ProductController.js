const Product = require("../models/ProductModel");
const dataset = require("../dataset/product.json");
const uploadData = async (req, res) => {
  try {
    await dataset.forEach(async (element) => {
      await Product.create([
        {
          prod_code: element.prod_code,
          namaProduk: element.namaProduk,
          beratGram: element.beratGram,
          panjangCm: element.panjangCm,
          lebarCm: element.lebarCm,
          tinggiCm: element.tinggiCm,
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