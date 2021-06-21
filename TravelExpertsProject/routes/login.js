var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const { Customer } = require("../models/customerRegister");
const passport = require("passport");
const local = require("passport-local");

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.render("login", { title: "Travel Expert | Login" });
});

router.post(
  "/test",
  passport.authenticate("customer", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
); // from passportjs.org

router.get("/signup", (req, res, next) => {
  res.render("loginsignup", { title: "Sign Up" });
});

router.post("/signup", (req, res, next) => {
  console.log("signup endpoint");
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) throw err;
    // Replace the plain password with the hashed password
    req.body.password = hashedPassword;
    const newCustomer = new Customer(req.body);
    newCustomer.save((err, result) => {
      if (err) {
        const errorArray = [];
        const errorKeys = Object.keys(err.errors);
        errorKeys.forEach((key) => errorArray.push(err.errors[key].message));
        return res.render("loginsignup", {
          errors: errorArray,
          CustFirstName: req.body.CustFirstName,
          CustLastName: req.body.CustLastName,
          CustAddress: req.body.CustAddress,
          CustCity: req.body.CustCity,
          CustProv: req.body.CustProv,
          CustPostal: req.body.CustPostal,
          CustHomePhone: req.body.CustHomePhone,
          CustBusPhone: req.body.CustBusPhone,
          CustEmail: req.body.CustEmail,
          CustomerId: req.body.CustomerId,
          AgentId: req.body.AgentId,
        });
      }
      // Welcome message for succesful account creation GV
      console.log(result);
      res.render("login", {
        fname: result.CustFirstName,
        lname: result.CustLastName,
        msg: "Welcome ",
        msg2: ", Please login with your credentials",
      });
    });
  });
});

module.exports = router;
