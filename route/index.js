const { Router } = require('express')
const express = require('express')
const router = express.Router()
const authController = require('./../controller').auth
const imageController = require('./../controller').image
router.get('/auth/:id', authController.getUser)
router.post('/sign-up', authController.signUp)
router.post('/verify-email', authController.verifyEmail)
router.post('/login', authController.login)
router.post('/forget',authController.forgetPassword)
router.patch('/reset-password/:id',authController.resetPassword)

//image
router.post('/upload-image',imageController.uploadImage)
module.exports = router