const mongoose = require("mongoose");
const relationSchema = new mongoose.Schema({
  kodeCabang: {
    type: String,
    ref: "Branch", // Reference the Branch model
  },
  custNum: { type: Number, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  zipCode: { type: Number, required: true },
  latitude: { type: Number },
  longitude: { type: Number }
});

const Relation = mongoose.model("Relation", relationSchema);
module.exports = Relation;