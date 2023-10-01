const asyncHandler = require("express-async-handler");
const Client = require("../models/Client");

// @desc Get all clients
// @route GET /client
// @access Private
const getClients = asyncHandler(async (req, res) => {
  const users = await Client.find();
  res.status(200).json(users);
});
// @desc Get a client
// @route GET /client/:clientId
// @access Private
const getClient = asyncHandler(async (req, res) => {
  const clientId = req.params.clientId;
  const clientFound = await Client.findById(clientId).lean().exec();
  if (!clientFound) {
    return res.status(404).json({ message: "Client not Found" });
  }

  res.status(200).json({ clientFound });
});

// @desc Create a new client
// @route POST /client
// @access Private
const createClient = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, birthday, phoneNumber, gender } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !birthday ||
    !phoneNumber ||
    !gender
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Check for duplicate username
  const emailDuplicate = await Client.findOne({ email: email }).lean().exec();

  // Check for duplicate phone number
  const phoneDuplicate = await Client.findOne({ phoneNumber: phoneNumber })
    .lean()
    .exec();

  if (emailDuplicate) {
    return res
      .status(409)
      .json({ message: "Email has already been registered." });
  }
  if (phoneDuplicate) {
    return res
      .status(409)
      .json({ message: "Phone number has already been registered." });
  }
  const newClient = new Client(req.body);

  const savedClient = await newClient.save();
  res.status(201).json(savedClient);
});
module.exports = { getClients, getClient, createClient };
