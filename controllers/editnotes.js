const con = require("../db_con");
const jwt = require('jsonwebtoken');


const editNotes = async (req, res) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        const { content, title, note_id } = req.body;
        const authData = jwt.verify(req.authToken, jwtSecretKey);
        const user_id = authData.data[0].user_id;
        require('dotenv').config();
        // Check if the user exists
        const [userRows] = await con.promise().query('SELECT * FROM users WHERE user_id = ?', [user_id]);
        if (userRows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }
        // Edit a note if user exists
        const [rows] = await con.promise().query('UPDATE notes SET title=?,content=? WHERE note_id = ?', [title, content, note_id]);
        if (rows.affectedRows != 0) {
            return res.status(200).json({ success: true, message: "Note Edited Successfully", data: rows });
        } else {
            return res.status(400).json({ success: false, message: "Does Note Edite !" });
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { editNotes };
