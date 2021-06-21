var createError = require("http-errors");
const express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoSanitze = require("express-mongo-sanitize");

const pug = require("pug");
const app = express();

//routers
var indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const packagesRouter = require("./routes/packages");
const agentRouter = require("./routes/agent");
const suppliercontactsRouter = require("./routes/suppliercontacts");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//mongo sanitaze for cleaning forms on the way to the data base removing unsafe characters GV
app.use(mongoSanitze({ replaceWith: "_" }));

// travelpassports
require("./travelpassport").init(app);

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/packages", packagesRouter);
app.use("/agent", agentRouter);
app.use("/suppliercontacts", suppliercontactsRouter);

app.use((req, res, next) => {
  res.status(404).render("error");
});

module.exports = app;
