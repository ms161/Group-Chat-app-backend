const Message = require('../models/messageModel')
const User = require('../models/userModel')
function Invalidstring(str) {
    if (str.trim().length == 0 || str == undefined) {
        return true;
    } else {
        return false;
    }
}



exports.postMessage = async (req, res) => {
    try {
        const { message } = req.body
        console.log(message)
        if (Invalidstring(message)) {
            return res.status(400).json({ message: 'Type some message to send' })
        }
        const data = await Message.create({
            message: message,
            userId: req.user.id
        })
        res.status(200).json({ newMessage: data });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}

exports.getMessages = async (req, res) => {
    try {
        const allMessages = await Message.findAll({
            attributes: ['id', 'message'],

            include: [{
                model: User,
                attributes: ['name'],
                required: true
            }],

        })
        console.log(allMessages)
        allMessages.forEach(element => {
            console.log(element.message, '>>>>>>>>>>>>>')
        });
        res.status(200).json({ messages: allMessages })

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}
