var express = require("express");
var router = express.Router();
const { Package } = require("../models/package");

router.get("/", (req, res, next) => {
  Package.find((err, packages) => {
    res.render("packages", { packages: packages });
  });
});

router.get("/:pkgId", (req, res, next) => {
  const pkgId = req.params.pkgId;
  const query = { PackageId: pkgId };
  console.log(query);
  console.log(pkgId);
  Package.findOne(query, (err, package) => {
    if (err) {
      console.log(err);
      next(err);
    }
    res.render("pid", { package });
  });
});

router.get("/:pkgId/cart", (req, res, next) => {
  console.log("POINT A");
  const pkgId = req.params.pkgId;
  const query = { PackageId: pkgId };
  console.log(query);
  console.log(pkgId);
  Package.findOne(query, (err, package) => {
    if (err) {
      console.log(err);
      next(err);
    }
    res.render("cart", { package });
  });
});

router.get("/:cart/thankyou", (req, res, next) => {
  console.log("POINT A");
  const pkgId = req.params.cart;
  const query = { PackageId: pkgId };
  console.log(query);
  console.log(pkgId);
  Package.findOne(query, (err, package) => {
    if (err) {
      console.log(err);
      next(err);
    }
    res.render("thankyou", { package });
  });
});

module.exports = router;
