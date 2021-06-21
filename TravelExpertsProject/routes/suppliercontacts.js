var express = require("express");
var router = express.Router();
const Suppliercontact = require("../models/suppliercontact");

router.get("/", function (req, res, next) {
  Suppliercontact.find((err, suppliercontacts) => {
    if (err) {
      console.log(err);
      next(err);
    }
    res.render("suppliercontacts", { suppliercontacts: suppliercontacts });
  });
});

router.get("/:SContactId", function (req, res, next) {
  const SContactId = req.params.SContactId;
  const query = { SupplierContactId: SContactId };
  Suppliercontact.findOne(query, (err, suppliercontact) => {
    if (err) {
      console.log(err);
      next(err);
    }
    res.render("suppliercontact", { suppliercontact });
  });
});

module.exports = router;
