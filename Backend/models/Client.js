const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema(
  {
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
    secondaryPhoneNumber: {
      type: Number,
      default: null,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Client", clientSchema);
