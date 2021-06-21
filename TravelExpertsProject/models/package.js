// Author - Grant van Boeschoten
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const mongoDB =
  "mongodb+srv://team5access:mostafa@cluster0.wspcn.mongodb.net/TravelExperts?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

/// To log the Mongoose errors to the console directly

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Mongoose is connected to the TravelExperts Database PACKAGE");
});

const packageSchema = new mongoose.Schema({
  PackageId: Number,
  PkgName: String,
  PkgStartDate: Date,
  PkgEndDate: Date,
  PkgDesc: String,
  PkgBasePrice: Number,
  PkgChildPrice: Number,
  PkgAgencyCommission: Number,
  Img1: String,
  Img2: String,
  Img3: String,
  LocalAttraction: String,
});

// create a model Customers useing customersSchema
module.exports.Package = mongoose.model("Package", packageSchema);
