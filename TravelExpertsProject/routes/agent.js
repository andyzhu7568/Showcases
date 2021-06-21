var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const { Agent } = require("../models/agent");
const passport = require("passport");
const local = require("passport-local");
const { Customer } = require("../models/customerRegister");

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.render("agent", { title: "Travel Expert | Agent Login" });
});

router.post(
  "/login",
  passport.authenticate("agent", {
    successRedirect: "/agent/agentdashboard",
    failureRedirect: "/agent",
  })
);

router.get("/agentdashboard", (req, res, next) => {
  res.render("agentdashboard", { title: "Travel Expert | Agent Dashboard" });
});

router.post("/search", (req, res, next) => {
  const email = req.body.CustEmail;
  const query = { CustEmail: email };
  console.log(query);
  console.log(email);
  Customer.findOne(query, (err, result) => {
    if (err) {
      console.log(err);
      next(err);
    }
    res.render("agentresult", { result });
  });
});

router.post("/commission", (req, res, next) => {
  const agentId = req.body.AgentId;
  const query = { AgentId: agentId };
  console.log(query);
  console.log(agentId);
  Agent.findOne(query, (err, commission) => {
    if (err) {
      console.log(err);
      next(err);
    }
    res.render("agentresult", { commission });
    console.log(commission.Commission);
  });
});

router.get("/create", (req, res, next) => {
  res.render("agentcreate", {
    title: "Travel Expert | Create Customer Record",
  });
});

router.post("/create", (req, res, next) => {
  console.log("create endpoint");
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
        return res.render("agentcreate", {
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
      res.render("agentdashboard", {
        fname: result.CustFirstName,
        lname: result.CustLastName,
        msg: "New Customer Created:",
      });
    });
  });
});

router.get("/:delete", (req, res, next) => {
  const id = req.params.delete;
  const query = { CustomerId: id };
  Customer.deleteOne(function (err, query) {
    if (err) return handleError(err);
    Customer.findById(query, function (err, query) {
      console.log(query);
    });
  });
  res.render("agentdashboard", {
    msg: "This Customer Is Deleted:",
  });
});

module.exports = router;
