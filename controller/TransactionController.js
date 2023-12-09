const Transaction = require("../models/TransactionModel");
const dataset = require("../dataset/transaction.json");

const uploadData = async (req, res) => {
  try {
    var datasetSlice = dataset.slice(0, 30);
    await datasetSlice.forEach(async (element) => {
      await Transaction.create([
        {
          staffId: element.staffId,
          orderNum: element.ORDER_NUMBER,
          deliveryNum: element.DELIVERY_NO,
          custNum: element.CUSTOMER_NUMBER,
          prod_code: element.PRODUCT_CODE,
          shipped_qty: element.SHIPPED_QTY,
          delivery_date: element.DISPATCH_DATE,
          arrival_date: element.arrival_date,
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
        $unwind: "$productDetails", // Memastikan address tidak berupa array
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
        $unwind: "$address", // Memastikan address tidak berupa array
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
        $unwind: "$productDetails", // Memastikan address tidak berupa array
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
        $unwind: "$address", // Memastikan address tidak berupa array
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

module.exports = {
  uploadData,
  getTransaction,
  assign,
  getTransactionSocket,
};