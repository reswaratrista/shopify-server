const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  vendorId: { type: Number, required: [true, "Nama tidak boleh kosong"] },
  vendorName: { type: String, unique: false },
  rate: { type: Number, required: true }, // Assuming "RATE" is a number
});

const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;