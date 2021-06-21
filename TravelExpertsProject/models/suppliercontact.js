var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const suppliercontactSchema = new mongoose.Schema({
  SupplierContactId: Number,
  SupConFirstName: String,
  SupConLastName: String,
  SupConCompany: String,
  SupConAddress: String,
  SupConCity: String,
  SupConProv: String,
  SupConPostal: String,
  SupConCountry: String,
  SupConBusPhone: Number,
  SupConFax: Number,
  SupConEmail: String,
  SupConURL: String,
  AffiliationId: String,
  SupplierId: String,
});

// create a model Customers useing customersSchema
module.exports = mongoose.model("Suppliercontact", suppliercontactSchema);
