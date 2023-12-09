const Transaction = require("../models/TransactionModel");
const dataset = require("../dataset/transaction.json");
const Vendor = require("../models/VendorModel");

const uploadData = async (req, res) => {
  try {
    var datasetSlice = dataset.slice(0, 30);
    await datasetSlice.forEach(async (element) => {
      await Transaction.create([
        {
          staffId: element.staffId,
          orderNum: element.orderNum,
          deliveryNum: element.deliveryNum,
          custNum: element.custNum,
          prod_code: element.prod_code,
          shipped_qty: element.shipped_qty,
          delivery_date: element.delivery_date,
          arrival_date: element.arrival_date,
          status: element.status,
        },
      ]);
    });
    res.formatter.ok("Upload data done");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error" });
  }
};

const getTransaction = async (req, res) => {
  try {
    var transactions = await Transaction.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "prod_code",
          foreignField: "prod_code",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails", 
      },
      {
        $lookup: {
          from: "relations",
          localField: "custNum",
          foreignField: "custNum",
          as: "address",
        },
      },
      {
        $unwind: "$address",
      },
      {
        $project: { //1 biar di include, bukan initialState
          _id: 1,
          "productDetails.panjangCm": 1,
          "productDetails.lebarCm": 1,
          "productDetails.tinggiCm": 1,
        },
      },
    ]);

    res.formatter.ok(transactions);
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal server error" });
  }
};

const getTransactionSocket = async (req, res) => {
  try {
    var transactions = await Transaction.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "prod_code",
          foreignField: "prod_code",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails", 
      },
      {
        $lookup: {
          from: "relations",
          localField: "custNum",
          foreignField: "custNum",
          as: "address",
        },
      },
      {
        $unwind: "$address", 
      },
    ]);

    return transactions;
  } catch (error) {
    console.log({ message: error.message || "Internal server error" });
  }
};

const assign = async (req, res) => {
  const { id, duration, packingDate, vendor, distance } =
    req.body;
  try {
    await Transaction.updateOne(
      { _id: id },
      {
        distance: distance,
        duration: duration,
        packing_date: packingDate,
        vendor: `${vendor}`,
      }
    );

    res.formatter.ok("Assign Successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error" });
  }
};


const getOngkir = async (req, res) => {
  try {
    const { transactionId } = req.params;

    // Assuming you have a valid ObjectId for the transactionId
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Calculate Ongkir based on distance
    const ongkir = calculateOngkir(transaction.distance, transaction.productDetails);

    return res.json({ ongkir });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const calculateOngkir = async (distance, productDetails) => {

  // Example: Summing up the dimensions of all products
  const totalPanjangCm = productDetails.reduce((sum, product) => sum + product.panjangCm, 0);
  const totalLebarCm = productDetails.reduce((sum, product) => sum + product.lebarCm, 0);
  const totalTinggiCm = productDetails.reduce((sum, product) => sum + product.tinggiCm, 0);

  // Your Ongkir calculation based on total dimensions and distance
  const dimensionFactor = totalPanjangCm * totalLebarCm * totalTinggiCm / 1000;

  const basePrice = await Vendor.getRate();

  if (distance < 10) {
    return basePrice + dimensionFactor; // Price for distances less than 10 units, considering dimension factor
  } else if (distance >= 10 && distance < 20) {
    return basePrice + dimensionFactor; // Price for distances between 10 and 20 units, considering dimension factor
  } else {
    return basePrice + dimensionFactor; // Default price for other distances, considering dimension factor
  }
};

module.exports = {
  uploadData,
  getTransaction,
  assign,
  getTransactionSocket,
  getOngkir,
};