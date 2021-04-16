const Product = require("../models/product")
const Order = require("../models/order")

exports.getProducts = (req, res, next) => {
  Product.find()
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

  // Vanilla mongodb.
  // Product.fetchAll()
  //   .then((products) => {
  //     res.render("shop/product-list", {
  //       prods: products,
  //       pageTitle: "All Products",
  //       hasProducts: products.length > 0,
  //       activeShop: true,
  //       productsCSS: true,
  //       path: "/product",
  //     })
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
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
  //vanilla mongodb
  // const prodId = req.params.productId
  // Product.findById(prodId)
  //   .then((products) => {
  //     res.render("shop/product-details", {
  //       product: products,
  //       pageTitle: products.title,
  //       path: "/product",
  //     })
  //   })
  //   .catch((err) => console.log(err))

  //using sequelize in psql
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
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Home",
        path: "/",
        csrfToken: req.csrfToken(),
      })
    })
    .catch((err) => {
      console.log(err)
    })

  //vanilla mongodb
  // Product.fetchAll()
  //   .then((products) => {
  //     res.render("shop/index", {
  //       prods: products,
  //       pageTitle: "Home",
  //       path: "/",
  //     })
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
}

exports.getCarts = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const products = user.cart.items
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
      return req.user.addToCart(product)
    })
    .then((result) => {
      res.redirect("/cart")
    })
}

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId
  req.user
    .deleteFromCarts(prodId)
    .then(() => {
      res.redirect("/cart")
    })
    .catch((err) => console.log(err))
}

exports.postOrders = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } }
      })
      const order = new Order({
        users: {
          email: req.user.email,
          userId: req.user,
        },
        products: products,
      })
      return order.save()
    })
    .then((result) => {
      return req.user.clearCart()
    })
    .then(() => {
      res.redirect("/orders")
    })
    .catch((err) => console.log(err))
}

exports.getOrders = (req, res, next) => {
  Order.find({ "users.userId": req.user._id })
    .then((orders) => {
      res.render("shop/order", {
        path: "/orders",
        pageTitle: "Orders",
        orders: orders,
      })
    })
    .catch((err) => console.log(err))
}
