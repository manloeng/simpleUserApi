const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let Users = new Schema(
  {
    givenName: {
      type: String,
    },
    familyName: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = Users;
