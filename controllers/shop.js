const Product = require("../models/product")
const Cart = require("../models/cart")

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(({ rows, fieldData }) => {
    res
      .render("shop/product-list", {
        prods: rows,
        pageTitle: "All Products",
        hasProducts: rows.length > 0,
        activeShop: true,
        productsCSS: true,
        path: "/product",
      })
      .catch((err) => console.log(err))
  })
}
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId
  Product.findById(prodId).then(({ rows }) => {
    res
      .render("shop/product-details", {
        product: rows[0],
        pageTitle: rows.title,
        path: "/product",
      })
      .catch((err) => console.log(err))
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(({ rows, fieldData }) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Home",
        path: "/",
      })
    })
    .catch((err) => console.log(err))
}

exports.getCarts = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = []
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id,
        )
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty })
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      })
    })
  })
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price)
  })
  res.redirect("/cart")
}

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price)
    res.redirect("/cart")
  })
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
