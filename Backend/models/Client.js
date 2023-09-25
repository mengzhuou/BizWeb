const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Client", clientSchema);
