const asyncHandler = require("express-async-handler");
const Client = require("../models/Client");
const redisClient = require("../config/apiCache");

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
const getClient = async (req, res) => {
  const clientId = req.params.clientId;
  try {
    // Check if data is in Redis cache
    const cachedData = await redisClient.get(`clientData:${clientId}`);
    console.log(cachedData);
    if (cachedData) {
      const data = JSON.parse(cachedData);
      console.log("hit");
      res.status(200).json({ clientFound: data });
    } else {
      console.log("miss");
      const clientFound = await Client.findById(clientId).lean().exec();

      if (!clientFound) {
        return res.status(404).json({ message: "Client not found" });
      }
      console.log("will cache this data for future use!!!!");
      await redisClient.set(
        `clientData:${clientId}`,
        JSON.stringify(clientFound)
      );
      await redisClient.expire(`clientData:${clientId}`, 90);

      res.status(200).json({ clientFound });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Create a new client
// @route POST /client
// @access Private
const createClient = asyncHandler(async (req, res) => {
  let validation = await clientValidation(req.body);
  if (!validation.isValid) {
    return res.status(validation.status).json({ message: validation.message });
  }
  const newClient = new Client(req.body);

  const savedClient = await newClient.save();

  console.log("set");

  await redisClient.set(
    `clientData:${savedClient._id}`,
    JSON.stringify(savedClient)
  );
  await redisClient.expire(`clientData:${savedClient._id}`, 90);

  res.status(201).json(savedClient);
});

// @desc Delete a client
// @route DELETE /client
// @access Private
const deleteClient = asyncHandler(async (req, res) => {
  const clientId = req.params.id;
  const resp = await Client.deleteOne({ _id: clientId });
  if (resp.deletedCount === 0) {
    return res
      .status(404)
      .json({ message: "No clients matched the provided ID" });
  } else {
    console.log("del");
    await redisClient.del(`clientData:${clientId}`);
    return res
      .status(200)
      .json({ message: `Deleted ${clientId} successfully` });
  }
});

// Utils
const clientValidation = async (data) => {
  const {
    firstName,
    lastName,
    email,
    birthday,
    phoneNumber,
    secondaryPhoneNumber,
  } = data;

  if (!firstName || !lastName || !email || !birthday || !phoneNumber) {
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
  regex = /^1\d{10}$/;
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
    regex = /^1\d{10}$/;
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
module.exports = { getClient, getClients, createClient, deleteClient };
