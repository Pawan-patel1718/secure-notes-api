const connection = require("../db_con")
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    let { email_id, password } = req.body;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        let result = await connection.promise().query('INSERT INTO users SET ?', { email_id, password })

        // if user created successfully then generate jwt token and send it to client  
        if (result.affectedRows != 0) {
            let [rows] = await connection.promise().query('SELECT `email_id`,`user_id` FROM users WHERE email_id = ? AND password = ?', [email_id, password])
            if (rows.length != 0) {

                let data = {
                    time: new Date().toLocaleString(),
                    data: rows,
                }
                const token = jwt.sign(data, jwtSecretKey);

                res.status(200).json({ success: true, message: "User Registered Successfully", token: token })
            } else {
                res.status(401).json({ success: false, message: "Something Went Wrong !" });
            }
        } else {
            res.status(401).json({ success: false, message: "Something Went Wrong !" });
        }
    } catch (error) {
        if (error.errno == 1062) {
            res.status(400).json({ success: false, message: "Email id allready exists go to the login page" })
            return
        }
        res.status(400).json({ success: false, message: error.message })
        console.error(error);
    }
}
const loginUser = async (req, res) => {
    let { email_id, password } = req.body;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        let [rows] = await connection.promise().query('SELECT `email_id`,`user_id` FROM users WHERE email_id = ? AND password = ?', [email_id, password])
        if (rows.length != 0) {

            let data = {
                time: new Date().toLocaleString(),
                data: rows,
            }
            const token = jwt.sign(data, jwtSecretKey);

            res.status(200).json({ success: true, message: "Login Successfull ", data: rows, token: token })
        } else {
            res.status(401).json({ success: false, message: "Invalid email or password" });
        }
    } catch (error) {
        if (error.errno == 1062) {
            res.status(400).json({ success: false, message: "Email id allready exists go to the login page" })
            return
        }
        res.status(400).json({ success: false, message: error.message })
        console.error(error);
    }
}

module.exports = { registerUser, loginUser }