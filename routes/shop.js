const path = require("path")
const express = require("express")
const shopController = require("../controllers/shop")
const isAuth = require("../middleware/is-auth")

const router = express.Router()

router.get("/", shopController.getIndex)

router.get("/product", shopController.getProducts)

router.get("/product/:productId", shopController.getProduct)

router.get("/cart", isAuth, shopController.getCarts)

router.post("/cart", isAuth, shopController.postCart)
router.post("/cart-delete-item", isAuth, shopController.postCartDeleteItem)

router.post("/create-order", isAuth, shopController.postOrders)
router.get("/orders", isAuth, shopController.getOrders)

module.exports = router
