const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const loginRouter = require("./routes/login");
var session = require("express-session");
var bodyParser = require("body-parser");

module.exports.init = function (app) {
  // app.use(
  //   require("express-session")({       commented out to try demo from passport docs
  //     secret: "k33pITs3cret",          http://www.passportjs.org/docs/
  //     resave: true,
  //     saveUninitialized: true,
  //   })
  // );
  app.use(express.static("public"));
  app.use(session({ secret: "k33pITs3cret" }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.use(passport.session());

  // require Customer Schema
  const { Customer } = require("./models/customerRegister");
  const { Agent } = require("./models/agent");
  const { Passport } = require("passport");
  const bcrypt = require("bcryptjs");

  //give access to login router GV
  loginRouter.passport = passport;

  //Passport local strategy    COMMENTED OUT to try example from passport.js docs
  passport.use(
    "customer",
    new LocalStrategy(function (username, password, done) {
      Customer.findOne({ username: username }, function (err, user) {
        if (err) {
          console.log("error from app.js 52");
          return done(err);
        }
        if (!user) {
          console.log("no user account");
          return done(null, false);
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // successful login
            console.log("succesful login");

            return done(null, user);
          } else {
            console.log("passwords dont match");
            // passwords don't match
            return done(null, false, { msg: "Incorrect password" });
          }
        });
      });
    })
  );

  passport.use(
    "agent",
    new LocalStrategy(function (username, password, done) {
      console.log("Username and password", username, password);
      Agent.findOne({ AgtEmail: username }, function (err, user) {
        console.log(user);
        if (err) {
          console.log("error from app.js 52");
          return done(err);
        }
        if (!user) {
          console.log("no user account");
          return done(null, false);
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // successful login
            console.log("succesful login");

            return done(null, user);
          } else {
            console.log("passwords dont match");
            // passwords don't match
            return done(null, false, { msg: "Incorrect password" });
          }
        });
      });
    })
  );

  // COMMENTED OUT because error message is user.validPassword is not a function
  // passport.use(
  //   new LocalStrategy(function (username, password, done) {
  //     Customer.findOne({ username: username }, function (err, user) {
  //       if (err) {
  //         return done(err);
  //       }
  //       if (!user) {
  //         return done(null, false, { message: "Incorrect username." });
  //       }
  //       if (!user.validPassword(password)) {
  //         return done(null, false, { message: "Incorrect password." });
  //       }
  //       return done(null, user);
  //     });
  //   })
  // );

  passport.serializeUser(function (user, done) {
    let userPrototype = Object.getPrototypeOf(user);
    if (userPrototype === Customer.prototype) {
      user.userType = "Customer";
    } else {
      user.userType = "Agent";
    }
    done(null, { id: user.id, userType: user.userType });
  });

  passport.deserializeUser(function (userObject, done) {
    if (userObject.userType === "Customer") {
      Customer.findById(userObject.id, function (err, user) {
        done(err, user);
      });
    } else {
      Agent.findById(userObject.id, function (err, user) {
        done(err, user);
      });
    }
  });

  // app.post(
  //   "/login",
  //   passport.authenticate("local", { failureRedirect: "/login" }),
  // function (req, res) {
  //   const headermsg = `Welcome ${Customer.CustFirstName} ${Customer.CustLastName}.
  //     You are now logged in.`;
  //   res.redirect("/?headermsg=" + headermsg);
  // }
  // );

  // app.use(passport.initialize()); called earlier
  // app.use(passport.session()); called earlier
};

//code I might need later
// const headermsg = `Welcome ${Customer.CustFirstName} ${Customer.CustLastName}.
//         You are now logged in.`
