'use strict'
const express = require('express')
const router = express.Router()
//const VerifyToken=require("../../middlewares/VerifyToken")
const userController = require("../../service/users")

router.post('/register',userController.registeruser) // validate and register
//router.put('/login',auth_userController.loginuser) // login
//router.get('/user',auth_userController.allUsers)
//router.put("/password/reset",auth_userController.passwordresetuser)
//router.put("/password/reset/confirm",auth_userController.passwordresetconfrirmuser)
//router.put("/user/:id",auth_userController.updateuser)

//router.post('/forgot-password',  authController.forgot_password)
//router.post('/reset-password', authController.reset_password)
/*router.get('/user/me',VerifyToken,function(req, res, next) {
    console.log("----------is the user id came from outside----------")
    console.log(req.userId);  
    res.status(200).send({
              "status":"authenticated",
              "id":req.userId
            })})
     
    

*/
module.exports = router
