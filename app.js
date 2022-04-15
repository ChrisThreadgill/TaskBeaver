const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { sequelize } = require("./db/models");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const apiRouter = require("./routes/api");
const modalRouter = require("./routes/modal");

const { environment, db, port, sessionSecret } = require("./config");
const { restoreUser } = require("./auth");

const app = express();

// view engine setup
app.set("view engine", "pug");
const store = new SequelizeStore({ db: sequelize });
app.use(
  session({
    secret: sessionSecret,
    name: "beavertown.sid",
    store,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(restoreUser);

// set up session middleware

// create Session table if it doesn't already exist
store.sync();
app.use(modalRouter);
app.use("/api", apiRouter);

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
  console.log(err.message)
  res.render("error");
});

module.exports = app;
