const Message=require('../models/messageModel')
function Invalidstring(str){
    if(str.trim().length==0 || str == undefined){
        return true;
    }else{
        return false;
    }
}

exports.message = async (req, res) => {
try{
    const { message } = req.body
    console.log(message)
    if(Invalidstring(message)){
        return res.status(400).json({message:'Type some message to send'})
    }
    const data=await Message.create({
        message:message,
        userId:req.user.id 
    })
    res.status(200).json({newMessage: data});}
    catch(err){console.log(err)}
}