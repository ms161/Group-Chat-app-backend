const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const bodyParser=require('body-parser')
dotenv.config()
const sequelize=require('./util/database')
const app=express()
app.use(cors({origin:'http://localhost:3000'})) 

//MODELS
const User=require('./models/userModel')
const Message=require('./models/messageModel')
//MODELS


//ROUTES
const userRoutes=require('./routes/userRoutes')
const messageRoutes=require('./routes/messageRoutes')

//ROUTES
app.use(bodyParser())

app.use('/user',userRoutes)
app.use(messageRoutes)


//RELATIONS
User.hasMany(Message)
Message.belongsTo(User)
//RELATIONS

sequelize
    .sync({ force: false })
    .then(() => {
        app.listen(5000)
    })
    .catch((err) => {
        console.log(err)
    })
