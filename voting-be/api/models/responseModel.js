//create a database instance
"use strict";
const mongoose = require("mongoose");

const ResponseSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    preference: {
      type: Array,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Responses", ResponseSchema);
