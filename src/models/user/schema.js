const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let Users = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    givenName: {
      type: String,
    },
    familyName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Users;
