// Author - Grant van Boeschoten
const { Decimal128 } = require("bson");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const feeSchema = new mongoose.Schema({
  FeeId: String,
  FeeName: String,
  FeeAmt: Decimal128,
});

// create a model Customers useing customersSchema
module.exports.Fee = mongoose.model("Fee", feeSchema);
