const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const {verifyJWT} = require('../middleware/verifyJWT')

router.use(verifyJWT('manager'))

router.route('/resetPassword').patch(usersController.updateUserPassword)

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)


router.route('/:id').get(usersController.getUser)

module.exports = router