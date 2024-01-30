const express=require('express')

const router=express.Router()
const messageController=require('../controllers/messageController')
const auth=require('../middlewares/authentication')

router.post('/postMessage',auth.authenticate,messageController.postMessage)

router.get('/getMessages',auth.authenticate,messageController.getMessages)

module.exports=router
