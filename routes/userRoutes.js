const express=require('express')
const router=express.Router()

const userController=require('../controllers/userController')

router.post('/sign-up',userController.userSignup)

router.post('/login',userController.userLogin)

module.exports=router
