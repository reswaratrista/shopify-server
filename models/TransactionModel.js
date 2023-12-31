const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  staffId: {
    type: String,
    ref: "User", // Reference the User model
  },
  orderNum: {
    type: Number,
    required: true,
  },
  deliveryNum: {
    type: Number,
    required: true,
  },
  custNum: {
    type: Number,
    ref: "Relation",
  },
  prod_code: {
    type: String,
    ref: "Product",
  },
  vendor: { type: String },
  shipped_qty: { type: Number },
  packing_date: { type: Date },
  delivery_date: { type: Date },
  arrival_date: { type: Date },
  distance: { type: Number },
  duration: { type: Number },
  status: {
    type: String,
    required: true,
    enum: ["Not Assigned", "On Delivery", "Done"],
    default: "Not Assigned",
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;