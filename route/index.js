const { Router } = require('express')
const express = require('express')
const router = express.Router()
const authController = require('./../controller').auth
const imageController = require('./../controller').image
const productController = require('./../controller').product
const { FileRead } = require('../middleware/uploadImage');
const userController = require('./../controller/index').user;

// auth model
router.get('/auth/:id', authController.getUser)
router.post('/sign-up', authController.signUp)
router.post('/verify-email', authController.verifyEmail)
router.post('/login', authController.login)
router.post('/forget',authController.forgetPassword)
router.patch('/reset-password/:id',authController.resetPassword)

// user model
router.get('/user',userController.userList)
router.get('/user/:id',userController.detail)
router.post('/user',userController.createUser)
router.put('/user/:id',userController.updateUser)
router.delete('/user/:id',userController.deleteUser)

// image
router.post('/upload-image',FileRead.array('file'),imageController.uploadImage)

//product
router.post('/bulk-product',productController.addbulk)
router.get('/product',productController.productList)

module.exports = router