const express = require("express");
const router = express.Router();
const clientsController = require("../controllers/clientsController");

router
  .route("/")
  .get(clientsController.getClients)
  .post(clientsController.createClient);

router.route("/:clientId").get(clientsController.getClient);
router.route("/:id").put(clientsController.deleteClient);

module.exports = router;
