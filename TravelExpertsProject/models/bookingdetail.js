const { Decimal128 } = require("bson");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const bookingdetailSchema = new mongoose.Schema({
  BookingDetailId: Number,
  ItineraryNo: Number,
  TripStart: Date,
  TripEnd: Date,
  Description: String,
  Destination: String,
  BasePrice: Decimal128,
  AgencyCommission: Decimal128,
  BookingId: Number,
  RegionId: String,
  ClassId: String,
  FeeId: String,
  ProductSupplierId: Number,
});

// create a model Customers useing customersSchema
module.exports = mongoose.model("Bookingdetail", bookingdetailSchema);
