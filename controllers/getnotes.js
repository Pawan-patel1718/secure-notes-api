const con = require("../db_con");
const jwt = require('jsonwebtoken');

const getNotes = async (req, res) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const authData = jwt.verify(req.authToken, jwtSecretKey);
        const user_id = authData.data[0].user_id;

        // Check if the user exists
        const [userRows] = await con.promise().query('SELECT * FROM users WHERE user_id = ?', [user_id]);
        if (userRows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }
        // Select the note if the user exists
        const [rows] = await con.promise().query('SELECT * FROM notes WHERE user_id = ?', [user_id]);
        if (rows.length != 0) {
            let { user_id, email_id } = userRows[0]
            return res.status(200).json({ success: true, message: "Notes Founds", data: rows, userDetails: { user_id, email_id } });
        } else {
            return res.status(200).json({ success: true, message: "You doesn't have any notes !" });
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

const deleteNotes = async (req, res) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    let { note_id } = req.query;
    try {
        const authData = jwt.verify(req.authToken, jwtSecretKey);
        const user_id = authData.data[0].user_id;

        // Check if the user exists
        const [userRows] = await con.promise().query('SELECT * FROM users WHERE user_id = ?', [user_id]);
        if (userRows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found!' })
        }
        // DELETE a note if user exists
        const [rows] = await con.promise().query('DELETE FROM notes WHERE note_id = ?', [note_id]);
        if (rows.affectedRows != 0) {
            return res.status(200).json({ success: true, message: "Note Deleted", data: rows });
        } else {
            return res.status(400).json({ success: false, message: "You doesn't have any notes !" });
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

const editNotes = async (req, res) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    let { note_id } = req.query;
    try {
        const authData = jwt.verify(req.authToken, jwtSecretKey);
        const user_id = authData.data[0].user_id;

        // Check if the user exists
        const [userRows] = await con.promise().query('SELECT * FROM users WHERE user_id = ?', [user_id]);
        if (userRows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }
        // Edit a note if user exists
        const [rows] = await con.promise().query('UPDATE notes SET ? WHERE note_id = ?', [note_id]);
        if (rows.affectedRows != 0) {
            return res.status(200).json({ success: true, message: "Note Added Successfully", data: rows });
        } else {
            return res.status(400).json({ success: false, message: "Something Went Wrong !" });
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { getNotes, deleteNotes, editNotes };
