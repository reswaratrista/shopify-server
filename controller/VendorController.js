const Vendor = require("../models/VendorModel");
const dataset = require("../dataset/vendor.json");


const uploadData = async (req, res) => {
  try {
    dataset.forEach(async (element) => {
      await Vendor.create([
        {
          vendorId: element.vendorId,
          vendorName: element.vendorName,
          rate: element.rate,
        },
      ]);
    });
    res.formatter.ok("Upload data done");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};

const getRate = async (vendorName) => {
  try {
    const vendor = await Vendor.findOne({ vendorName });

    if (!vendor) {
      throw new Error(`Vendor with name ${vendorName} not found`);
    }

    return vendor.rate;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching vendor rate');
  }
};

module.exports = {
  uploadData,
  getRate,
};