const User = require('../models/userModel')
const bcrypt=require('bcrypt')

exports.userLogin = (req, res) => {

}

exports.userSignup = async (req, res) => {
    try {
        const { name, email, pNumber, password } = req.body
        if (Invalidstring(email) || Invalidstring(pNumber))
            return res.status(400).json({ success: false, message: 'All the fields are mandatory' })

        const user = await User.findAll({ where: { email: email } })

        if (user.length > 0) {
            return res.status(400).json({ message: 'User already exists' })
        }

       bcrypt.hash(password,10,async(err,hash)=>{
        const data=await User.create({
            name: name,
            email : email,
            phoneNumber:pNumber,
            password : hash
        })
       })
       res.status(201).json({message:"Successfully new user created"}) 


    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: err })

    }
}


function Invalidstring(str) {
    if (str.trim().length == 0 || str == undefined) {
        return true;
    } else {
        return false;
    }
}

