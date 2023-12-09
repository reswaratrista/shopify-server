const Product = require("../models/ProductModel");
const dataset = require("../dataset/product.json");
const uploadData = async (req, res) => {
  try {
    await dataset.forEach(async (element) => {
      await Product.create([
        {
          prod_code: element.kode_produk,
          namaProduk: element.nama_produk,
          beratGram: element.berat_gram,
          panjangCm: element.panjangCm,
          lebarCm: element.lebar_cm,
          tinggiCm: element.tinggi_cm,
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