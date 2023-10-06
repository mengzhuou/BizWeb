const asyncHandler = require("express-async-handler");
const Client = require("../models/Client");

const getClients = asyncHandler(async (req, res) => {
  const users = await Client.find();
  res.status(200).json(users);
});
const createClient = asyncHandler(async (req, res) => {
  let validation = await clientValidation(req.body);
  if (!validation.isValid) {
    return res.status(validation.status).json({ message: validation.message });
  }
  const newClient = new Client(req.body);

  const savedClient = await newClient.save();
  res.status(201).json(savedClient);
});

const clientValidation = async (data) => {
  const {
    firstName,
    lastName,
    email,
    birthday,
    phoneNumber,
    secondaryPhoneNumber,
    gender,
  } = data;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !birthday ||
    !phoneNumber ||
    !gender
  ) {
    return { isValid: false, status: 400, message: "All fields are required" };
  }
  // Validate email
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailDuplicate = await Client.findOne({ email: email }).lean().exec();
  if (!regex.test(email)) {
    return {
      isValid: false,
      status: 400,
      message: "Please enter a valid email address.",
    };
  } else if (emailDuplicate) {
    return {
      isValid: false,
      status: 409,
      message: "Email has already been registered.",
    };
  }
  // Validate primary phone number
  regex = /^[0-9]{10}$/;
  const primaryDuplicate = await Client.findOne({
    $or: [{ secondaryPhoneNumber: phoneNumber }, { phoneNumber: phoneNumber }],
  })
    .lean()
    .exec();
  if (!regex.test(phoneNumber)) {
    return {
      isValid: false,
      status: 400,
      message: "Please enter a valid primary phone number.",
    };
  } else if (primaryDuplicate) {
    return {
      isValid: false,
      status: 409,
      message: "Primary phone number has already been registered.",
    };
  }
  // Validate secondary phone number
  if (secondaryPhoneNumber) {
    if (secondaryPhoneNumber == phoneNumber) {
      return {
        isValid: false,
        status: 400,
        message:
          "Please enter a different secondary phone number other than primary.",
      };
    }
    regex = /^[0-9]{10}$/;
    const secondaryDuplicate = await Client.findOne({
      $or: [
        { secondaryPhoneNumber: secondaryPhoneNumber },
        { phoneNumber: secondaryPhoneNumber },
      ],
    })
      .lean()
      .exec();
    if (!regex.test(secondaryPhoneNumber)) {
      return {
        isValid: false,
        status: 400,
        message: "Please enter a valid secondary phone number.",
      };
    } else if (secondaryDuplicate) {
      return {
        isValid: false,
        status: 409,
        message: "Secondary phone number has already been registered.",
      };
    }
  }
  return { isValid: true, message: "Inputs are valid." };
};
module.exports = { getClients, createClient };
