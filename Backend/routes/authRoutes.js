const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/loginLimiter')
const {verifySingleUseJWT} = require('../middleware/verifyJWT')

router.route('/')
    .post(loginLimiter, authController.login)

router.route('/register')
    .post(authController.register)

router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)

router.route('/singleuse').post(authController.oneTime)

router.route('/verifyToken').post(verifySingleUseJWT)

module.exports = router
