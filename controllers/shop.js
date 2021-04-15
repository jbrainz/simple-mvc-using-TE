const Product = require("../models/product")

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        hasProducts: products.length > 0,
        activeShop: true,
        productsCSS: true,
        path: "/product",
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId
  Product.findById(prodId)
    .then((products) => {
      res.render("shop/product-details", {
        product: products,
        pageTitle: products.title,
        path: "/product",
      })
    })
    .catch((err) => console.log(err))
  // Product.findAll({
  //   where: {
  //     id: prodId,
  //   },
  // })
  //   .then((products) => {
  //     res.render("shop/product-details", {
  //       product: products[0],
  //       pageTitle: products.title,
  //       path: "/product",
  //     })
  //   })
  //   .catch((err) => console.log(err))
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Home",
        path: "/",
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getCarts = (req, res, next) => {
  req.user
    .getCart()
    .then((products) => {
      res
        .render("shop/cart", {
          path: "/cart",
          pageTitle: "Your Cart",
          products: products,
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId)
    .then((product) => {
      console.log(product)
      return req.user.addTocart(product)
    })
    .then((result) => {
      res.redirect("/cart")
    })
}

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId
  req.user
    .deleteById(prodId)
    .then(() => {
      res.redirect("/cart")
    })
    .catch((err) => console.log(err))
}

exports.postOrders = (req, res, next) => {
  req.user
    .addOrder()
    .then((result) => {
      res.redirect("/orders")
    })
    .catch((err) => console.log(err))
}

exports.getOrders = (req, res, next) => {
  req.user
    .getOders()
    .then((orders) => {
      res.render("shop/order", {
        path: "/orders",
        pageTitle: "Orders",
        orders: orders,
      })
    })
    .catch((err) => console.log(err))
}
