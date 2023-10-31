const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const {verifyJWT} = require('../middleware/verifyJWT')
const {requireRole} = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(requireRole('manager'), usersController.getAllUsers)
    .post(requireRole('manager'), usersController.createNewUser)
    .patch(requireRole('manager'), usersController.updateUser)
    .delete(requireRole('manager'), usersController.deleteUser)

router.route('/:id').get(usersController.getUser)

module.exports = router