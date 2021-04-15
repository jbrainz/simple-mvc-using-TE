const path = require("path")
const express = require("express")
const shopController = require("../controllers/shop")

const router = express.Router()

router.get("/", shopController.getIndex)

router.get("/product", shopController.getProducts)

router.get("/product/:productId", shopController.getProduct)

router.get("/cart", shopController.getCarts)

router.post("/cart", shopController.postCart)
router.post("/cart-delete-item", shopController.postCartDeleteItem)

router.post("/create-order", shopController.postOrders)
router.get("/orders", shopController.getOrders)

module.exports = router
