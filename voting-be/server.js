const cors = require("cors");
const express = require("express"),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require("mongoose"),
  Task = require("./api/models/responseModel"), //created model loading here
  bodyParser = require("body-parser");

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require("./api/routes/responseRoutes"); //importing route
routes(app); //register the route

app.listen(port);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

console.log("Response API server started on: " + port);
