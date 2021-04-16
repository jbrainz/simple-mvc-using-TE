const path = require("path")
const express = require("express")

const adminController = require("../controllers/admin")
const isAuth = require("../middleware/is-auth")

const router = express.Router()

// admin/add-product => GET request
router.get("/add-product", isAuth, adminController.getAddProducts)

router.get("/products", isAuth, adminController.adminProducts)

// admin/add-product => POST request
router.post("/add-product", isAuth, adminController.postAddProducts)

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct)

router.post("/edit-product", isAuth, adminController.postEditProduct)

router.post("/delete-product", isAuth, adminController.deleteProduct)

module.exports = router
