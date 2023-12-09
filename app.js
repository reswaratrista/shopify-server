var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { responseEnhancer } = require("express-response-formatter");
const methodOverride = require("method-override");
const session = require("express-session");
var cors = require("cors");

var productRouter = require("./router/ProductRouter");
var relationRouter = require("./router/RelationRouter");
var transactionRouter = require("./router/TransactionRouter");
var userRouter = require("./router/UserRouter");
var vendorRouter = require("./router/VendorRouter");

var app = express();
const URL = `/api`;
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "test",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);
app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Add formatter functions to "res" object via "responseEnhancer()"
app.use(responseEnhancer());

// routers
app.use(`${URL}/user`, userRouter);
app.use(`${URL}/product`, productRouter);
app.use(`${URL}/relation`, relationRouter);
app.use(`${URL}/transaction`, transactionRouter);
app.use(`${URL}/vendor`, vendorRouter);

app.get("/", function (req, res) {
  res.send("Hello, my api is running");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;