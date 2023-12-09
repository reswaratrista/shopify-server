const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const HASH_ROUND = 10;

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  namaLengkap: { type: String, required: [true, "Nama tidak boleh kosong"] },
  email: { type: String, required: [true, "Email tidak boleh kosong"] },
  password: { type: String, required: [true, "Password tidak boleh kosong"] },
  role: {
    type: String,
    required: true,
    enum: ["admin", "superadmin", "driver"],
    default: "driver",
  },
});

userSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("User").countDocuments({ email: value });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;