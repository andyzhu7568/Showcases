var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Travel Expert | Index" });
});

router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "Travel Expert | Contact" });
});

module.exports = router;
