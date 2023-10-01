const con = require("../db_con");
const jwt = require('jsonwebtoken');

const addNotes = async (req, res) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const authData = jwt.verify(req.authToken, jwtSecretKey);
        const { content, title } = req.body;
        const user_id = authData.data[0].user_id;

        // Check if the user exists
        const [userRows] = await con.promise().query('SELECT * FROM users WHERE user_id = ?', [user_id]);

        if (userRows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Insert the note if the user exists
        const [noteRows] = await con.promise().query('INSERT INTO notes SET ?', { user_id, title, content });
        if (noteRows.affectedRows != 0) {
            return res.status(200).json({ success: true, message: "Note added successfully" });
        } else {
            return res.status(400).json({ success: false, message: "Something Went Wrong !" });
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { addNotes };
