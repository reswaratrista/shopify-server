const User = require("../models/UserModel");
const config = require("../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.formatter.ok(users);
  } catch (error) {
    res.formatter.badRequest(error);
  }
};

const getUser = async (req, res) => {
  try {
    res.formatter.ok(req.user);
  } catch (error) {
    res.formatter.badRequest(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const payload = req.body;

    // Generate ID
    let countRole = await User.countDocuments({
      role: req.body.role ?? "driver",
    });
    countRole++;
    const idNum =
      countRole < 10
        ? `00${countRole}`
        : countRole < 100
        ? `0${countRole}`
        : `${countRole}`;
    const userId =
      req.body.role == "admin"
        ? `A${idNum}`
        : req.body.role == "superadmin"
        ? `SA${idNum}`
        : `D${idNum}`;

    const newUser = await User.create({ ...payload, userId: userId });
    delete newUser._doc.password;
    res.status(201).json({ data: newUser });
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.status(422).json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
      const checkPassword = bcrypt.compareSync(password, user.password);
      if (checkPassword) {
        const token = jwt.sign(
          {
            user: {
              id: user.id,
              namaLengkap: user.namaLengkap,
              email: user.email,
            },
          },
          config.jwtKey
        );

        res.status(200).json({
          data: { token },
        });
      } else {
        res.status(403).json({
          message: "Password yang anda masukan salah.",
        });
      }
    } else {
      res.status(403).json({
        message: "Email yang anda masukan belum terdaftar.",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || `Internal server error`,
    });

    next();
  }
};

module.exports = {
  getAllUsers,
  signup,
  signin,
  getUser,
};