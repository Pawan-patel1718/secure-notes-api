const mysql = require("mysql2")
require('dotenv').config();

// console.log(process.env.DB_HOST)
// console.log(process.env.DB_USER_NAME)
// console.log(process.env.DB_PASS)
// console.log(process.env.DB_NAME)


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

module.exports = connection;

connection.connect((err) => {
    if (err) {
        throw err
    } else {
        console.log("Mysql Connected 😊!")
    }
})