const express = require("express");
const router = express.Router();
const clientsController = require("../controllers/clientsController");
const limiter = require('../middleware/rateLimiter') 

router
  .route("/")
  .get(limiter, clientsController.getClients)
  .post(clientsController.createClient);

router
  .route("/:id")
  .delete(clientsController.deleteClient)
  .get(clientsController.getClient);

module.exports = router;
