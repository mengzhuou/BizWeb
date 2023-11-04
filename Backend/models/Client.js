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
      sparse: true, // Allow null
    },
  },
  {
    timestamps: true,
  }
);
// Create a unique compound index for non-null and non-empty secondaryPhoneNumber
clientSchema.index(
  { secondaryPhoneNumber: 1 },
  {
    unique: true,
    partialFilterExpression: {
      secondaryPhoneNumber: { $type: "number" }, // Ensure it's a number
    },
  }
);
module.exports = mongoose.model("Client", clientSchema);
