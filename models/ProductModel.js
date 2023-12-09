const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  prod_code: { type: String, unique: true, required: true },
  namaProduk: { type: String, required: true },
  beratGram: { type: Number, required: true },
  panjangCm: { type: Number },
  lebarCm: { type: Number, required: true },
  tinggiCm: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;