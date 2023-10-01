const express = require("express")
const router = express.Router()
const { getAllProducts, getSingelProducts, addProduct } = require("../controllers/products")

router.route("/").get(getAllProducts)
router.route("/get-product").get(getSingelProducts)
router.route("/create-products").post(addProduct)

module.exports = router;