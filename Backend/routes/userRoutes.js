const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const {verifyJWT} = require('../middleware/verifyJWT')

router.route('/resetPassword').patch(usersController.updateUserPassword)
router.route('/:username').get(usersController.getUser)

router.use(verifyJWT('manager'))

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)



module.exports = router