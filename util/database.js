const Sequelize=require('sequelize')
const dotenv=require('dotenv')
dotenv.config()

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>',process.env.SQL_DB_NAME)
const sequelize=new Sequelize(process.env.SQL_DB_NAME,process.env.SQL_DB_USERNAME,process.env.SQL_DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.SQL_DB_HOST
  })
module.exports = sequelize;
