const express=require('express')

const router=express.Router()
const messageController=require('../controllers/messageController')
const auth=require('../middlewares/authentication')

router.post('/message',auth.authenticate,messageController.message)

module.exports=router