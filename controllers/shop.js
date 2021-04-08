const Product = require("../models/product")
const Cart = require("../models/cart")

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      hasProducts: products.length > 0,
      activeShop: true,
      productsCSS: true,
      path: "/product",
    })
  })
}
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId
  Product.findById(prodId, (product) => {
    res.render("shop/product-details", {
      product,
      pageTitle: product.title,
      path: "/product",
    })
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Home",
      path: "/",
    })
  })
}

exports.getCarts = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  })
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price)
  })
  res.redirect("/cart")
}

exports.getOrders = (req, res, next) => {
  res.render("shop/order", {
    path: "/orders",
    pageTitle: "Orders",
  })
}
exports.getCheckOut = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout Page",
  })
}