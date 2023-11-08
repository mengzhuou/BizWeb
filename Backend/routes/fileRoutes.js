const express = require('express')
const router = express.Router()
const fileController = require('../controllers/fileController')
const {verifyJWT} = require('../middleware/verifyJWT')

router.use(verifyJWT('employee'))

router.route('/')
    .post(fileController.upload)

module.exports = router