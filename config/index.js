const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

module.exports = {
  serviceName: process.env.SERVICE_NAME,
  rootPath: path.resolve(__dirname, ".."),
  jwtKey: process.env.SECRET,
  urlDb: process.env.MONGO_URL,
  map_key: process.env.MAPS_KEY,
};