const express = require("express");
const router = express.Router();
const clientsController = require("../controllers/clientsController");
const limiter = require('../config/rateLimiter')
const cacheClients = require("../middleware/cache")

router
  .route("/")
  .get(limiter, cacheClients, clientsController.getClients)
  .post(clientsController.createClient);


router.route("/:id").put(clientsController.deleteClient);

module.exports = router;
