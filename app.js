const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const bodyParser=require('body-parser')
dotenv.config()
const sequelize=require('./util/database')
const app=express()
app.use(cors()) 

//ROUTES
const userRoutes=require('./routes/userRoutes')

//ROUTES
app.use(bodyParser())



app.use('/user',userRoutes)


sequelize
    .sync({ force: true })
    .then(() => {
        app.listen(5000)
    })
    .catch((err) => {
        console.log(err)
    })
