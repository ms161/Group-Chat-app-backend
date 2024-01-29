const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateToken = (id, name, ispremiumuser) => {
    return jwt.sign({ userId: id, name: name }, process.env.JSW_WEB_TOKEN_SECRETKEY);
}

exports.userSignup = async (req, res) => {
    try {
        const { name, email, pNumber, password } = req.body
        if (Invalidstring(email) || Invalidstring(pNumber) || Invalidstring(name) || Invalidstring(password))
            return res.status(400).json({ success: false, message: 'All the fields are mandatory' })

        const user = await User.findAll({ where: { email: email } })

        if (user.length > 0) {
            return res.status(400).json({ message: 'User already exists' })
        }

        bcrypt.hash(password, 10, async (err, hash) => {
            const data = await User.create({
                name: name,
                email: email,
                phoneNumber: pNumber,
                password: hash
            })
        })
        res.status(201).json({ message: "Successfully new user created" })


    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: err })

    }
}


exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (Invalidstring(email) || Invalidstring(password)) {
            return res.status(400).json({ success: false, message: 'All the fields are mandatory' })
        }

        const user = await User.findAll({ where: { email: email } })
        if (user.length > 0) {
            const pass = user[0]?.dataValues.password
            console.log(user[0].dataValues.password, '>>>>>>>>>>>>>>123')
            bcrypt.compare(password, pass, async (err, result) => {
                if (err) {
                    res.status(500).json({ success: false, message: "Something Went Wrong" });

                }
                if (result) {
                    res.status(201).json({ success: true, message: "Successfully loggedIn", token: generateToken(user[0].id, user[0].name) })

                }
                else {
                    res.status(401).json({ success: false, message: "Password is incorrect" })

                }
            })
        }
        else {
            res.status(404).json({ success: false, message: "User not found" })
        }
    }
    catch (err) {
        res.status(500).json({ message: err, success: false })
        console.log(err)
    }

}

function Invalidstring(str) {
    if (str.trim().length == 0 || str == undefined) {
        return true;
    } else {
        return false;
    }
}

