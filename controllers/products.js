let con = require("../db_con")

const getAllProducts = async (req, res) => {
    let [rows] = await con.promise().query("SELECT * FROM employeeterritory ")
    res.status(200).json({ success: true, data: rows })
}

const addProduct = (req, res) => {
    // console.log(req.body)
    res.status(200).json({ success: true, message: req.body })
}
const getSingelProducts = async (req, res) => {
    const product_id = req.query.product_id;
    // let [rows] = await con.promise().query('SELECT * FROM product WHERE productId = ?', product_id)
    let [rows] = await con.promise().query(`SELECT * FROM product where productId = ${product_id}`)

    // console.log(req.query)
    // res.status(200).json({ success: true, name: req.params.productname, id: req.params.id })
    res.json({ success: true, data: rows })
}

module.exports = { getAllProducts, addProduct, getSingelProducts }