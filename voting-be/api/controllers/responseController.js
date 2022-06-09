//2 different functions, export each function to use in the routes
"use strict";

const mongoose = require("mongoose"),
  Response = mongoose.model("Responses");

exports.list_all_responses = function (req, res) {
  Response.find({}, function (err, response) {
    if (err) res.send(err);
    res.json(response);
  });
};

exports.create_a_response = function (req, res) {
  var new_response = new Response(req.body);
  new_response.save(function (err, response) {
    if (err) res.send(err);
    res.json(response);
  });
};
