const Vendor = require("../models/VendorModel");
const dataset = require("../dataset/vendor.json");
const dataCity = require("../dataset/cityList.json");
const axios = require("axios");
const apiKey = "e98923788ac06282c32fac27e30d6e62";
const { map_key } = require("../config");

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

// /* Get Cost From Raja Ongkir */
// const getOngkir = async (req, res) => {
//   const { origin, destination, weight, courier } = req.body;
//   try {
//     const response = await axios.post(
//       "https://api.rajaongkir.com/starter/cost",
//       {
//         origin: origin,
//         destination: destination,
//         weight: weight,
//         courier: courier,
//       },
//       {
//         headers: {
//           key: apiKey,
//           "content-type": "application/x-www-form-urlencoded",
//         },
//       }
//     );

//     res.formatter.ok(response.data);
//   } catch (error) {
//     res.status(500).json({
//       message:
//         error.response.data.rajaongkir.status.description ||
//         "Internal server error",
//     });
//   }
// };

// const getProvince = async (req, res) => {
//   const provinceId = req.query.provinceId;

//   try {
//     const response = await axios.get(
//       `https://api.rajaongkir.com/starter/province${
//         provinceId ? `?id=${provinceId}` : ""
//       }`,
//       {
//         params: {
//           id: provinceId,
//         },
//         headers: {
//           key: apiKey,
//         },
//       }
//     );

//     res.formatter.ok(response.data);
//   } catch (error) {
//     res.status(500).json({
//       message: error.response.data || "Internal server error",
//     });
//   }
// };

// const getCity = async (req, res) => {
//   const provinceId = req.query.provinceId;
//   const cityId = req.query.cityId;

//   try {
//     const response = await axios.get(
//       `https://api.rajaongkir.com/starter/city${cityId ? `?id=${cityId}` : ""}${
//         cityId && provinceId
//           ? "&province=" + provinceId
//           : provinceId
//           ? `?province=${provinceId}`
//           : ""
//       }`,
//       {
//         headers: {
//           key: apiKey,
//         },
//       }
//     );

//     res.formatter.ok(response.data);
//   } catch (error) {
//     res.status(500).json({
//       message: error.response.data || "Internal server error",
//     });
//   }
// };

// // REKOMENDASI ONGKIR
// const getCityId = (alamat) => {
//   function isSubset(kata, alamat) {
//     const kataArr = kata.split(/\s+/);
//     const alamatArr = alamat.split(/\s+/);

//     for (let kataWord of kataArr) {
//       const regex = new RegExp("\\b" + kataWord + "\\b", "i");

//       if (!alamatArr.some((alamatWord) => regex.test(alamatWord))) {
//         return false;
//       }
//     }

//     return true;
//   }

//   const matchingCity = dataCity.find((val) =>
//     isSubset(alamat.toLowerCase(), val.city_name.toLowerCase())
//   );

//   if (matchingCity) {
//     return matchingCity.city_id;
//   } else {
//     const matchingCity = dataCity.find((val) =>
//       isSubset(val.city_name.toLowerCase(), alamat.toLowerCase())
//     );
//     if (matchingCity) {
//       return matchingCity.city_id;
//     }
//   }

//   return undefined;
// };

// function recommendCourier(weight, distance, data) {
//   const criteriaMapping = [
//     { condition: weight > 10, moda: "UDARA", chargeBase: "KG" },
//     {
//       condition: weight > 20 && distance > 1000,
//       moda: "LAUT",
//       chargeBase: "KG",
//     },
//     {
//       condition: weight < 10 && distance < 500,
//       moda: "DARAT",
//       chargeBase: "SEKALI JALAN",
//     },
//     {
//       condition: weight < 15 && distance < 1000,
//       moda: "DARAT",
//       chargeBase: "BULANAN",
//     },
//     { condition: true, moda: "DARAT", chargeBase: "KG" }, // Default condition
//   ];

//   for (const criteria of criteriaMapping) {
//     if (criteria.condition) {
//       const filteredData = data.filter(
//         (val) =>
//           val.moda === criteria.moda && val.chargeBase === criteria.chargeBase
//       );

//       if (filteredData.length > 0) {
//         return filteredData;
//       }
//     }
//   }

//   return [];
// }

// const getDistanceAndDuration = async (req, res) => {
//   try {
//     const { branch_lat, branch_lng, add_lat, add_lng } = req.body;
//     const response = await axios.get(
//       `https://maps.googleapis.com/maps/api/directions/json?origin=${branch_lat},${branch_lng}&destination=${add_lat},${add_lng}&key=${map_key}`
//     );

//     const firstRoute = response.data.routes[0];
//     if (firstRoute.legs && firstRoute.legs.length > 0) {
//       const firstLeg = firstRoute.legs[0];

//       var distance = firstLeg.distance.text;
//       var duration = firstLeg.duration.text;
//     }
//     res.formatter.ok({
//       distance: distance,
//       duration: duration,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message || "Internal server error",
//     });
//   }
// };

// const getRecommendation = async (req, res) => {
//   const { weight, branch_address, branch_code, relation_address, distance } =
//     req.body;
//   try {
//     const hasil = [];
//     for (const courier of ["jne", "tiki", "pos"]) {
//       try {
//         const res = await axios.post(
//           "https://api.rajaongkir.com/starter/cost",
//           {
//             origin: getCityId(branch_address),
//             destination: getCityId(relation_address),
//             weight: weight,
//             courier: courier,
//           },
//           {
//             headers: {
//               key: apiKey,
//               "content-type": "application/x-www-form-urlencoded",
//             },
//           }
//         );

//         const courierResults = res.data.rajaongkir.results[0].costs.map(
//           (service) => ({
//             courier: courier,
//             service: service.service,
//             description: service.description,
//             cost: service.cost,
//           })
//         );

//         hasil.push(...courierResults);
//       } catch (error) {
//         console.error(`Error for courier ${courier}: ${error.message}`);
//       }
//     }

//     const sortedResults = hasil.sort(
//       (a, b) => a.cost[0].value - b.cost[0].value
//     );

//     // Internal
//     const aggregationPipeline = [
//       {
//         $match: {
//           cabang: branch_code,
//         },
//       },
//       {
//         $group: {
//           _id: {
//             moda: "$moda",
//             chargeBase: "$chargeBase",
//           },
//           lowestRateData: {
//             $push: {
//               _id: "$_id",
//               shipper: "$shipper",
//               shipmethod_code: "$shipmethod_code",
//               vendorId: "$vendorId",
//               service: "$service",
//               chargeBase: "$chargeBase",
//               licensePlate: "$licensePlate",
//               minType: "$minType",
//               calcType: "$calcType",
//               type: "$type",
//               moda: "$moda",
//               printFlag: "$printFlag",
//               packerFlag: "$packerFlag",
//               leadTime: "$leadTime",
//               ppnType: "$ppnType",
//               wht: "$wht",
//               lineNumber: "$lineNumber",
//               termMin: "$termMin",
//               termMax: "$termMax",
//               rate: "$rate",
//             },
//           },
//           lowestRate: {
//             $min: "$rate",
//           },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           data: {
//             $arrayElemAt: [
//               {
//                 $filter: {
//                   input: "$lowestRateData",
//                   cond: {
//                     $eq: ["$$this.rate", "$lowestRate"],
//                   },
//                 },
//               },
//               0,
//             ],
//           },
//         },
//       },
//       {
//         $replaceRoot: {
//           newRoot: "$data",
//         },
//       },
//       {
//         $sort: {
//           lowestRate: 1,
//         },
//       },
//     ];

//     // Jalankan agregasi
//     const aggregatedData = await Vendor.aggregate(aggregationPipeline);

//     var rekomendasi = recommendCourier(weight, distance, aggregatedData);

//     res.formatter.ok({
//       external: sortedResults,
//       rekomendasi: rekomendasi,
//       internal: aggregatedData,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message || "Internal server error",
//     });
//   }
// };

module.exports = {
  uploadData,
  getOngkir,
  getProvince,
  getCity,
  getRecommendation,
  getDistanceAndDuration,
};