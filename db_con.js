const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "secure_notes"
})

module.exports = connection;

connection.connect((err) => {
    if (err) {
        throw err
    } else {
        console.log("Mysql Connected 😊!")
    }
})