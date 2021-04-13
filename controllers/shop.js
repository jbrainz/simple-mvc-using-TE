const Product = require("../models/product")

exports.getProducts = (req, res, next) => {
  Product.findAll()
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
  Product.findByPk(prodId).then((products) => {
    res
      .render("shop/product-details", {
        product: products,
        pageTitle: products.title,
        path: "/product",
      })
      .catch((err) => console.log(err))
  })
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
  Product.findAll()
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
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: products,
          })
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
  let fetchedCart
  let newQ = 1
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart
      return cart.getProducts({ where: { id: prodId } })
    })
    .then((products) => {
      let product
      if (products.length > 0) {
        product = products[0]
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity
        newQ = oldQuantity + 1
        return product
      }
      return Product.findByPk(prodId)
      // .then((product) => {
      //   return fetchedCart.addProduct(product, {
      //     through: { quantity: newQ },
      //   })
      // })
      // .catch((err) => console.log(err))
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQ },
      })
    })
    .then(() => {
      res.redirect("/cart")
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } })
    })
    .then((products) => {
      const product = products[0]
      return product.cartItem.destroy()
    })
    .then(() => {
      res.redirect("/cart")
    })
    .catch((err) => console.log(err))
  // Product.findById(prodId, (product) => {
  //   Cart.deleteProduct(prodId, product.price)
  // })
}

exports.postOrders = (req, res, next) => {
  let fetchedCart
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart
      return cart.getProducts()
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((e) => {
              e.orderItem = { quantity: product.cartItem.quantity }
              return e
            }),
          )
        })
        .catch((err) => console.log(err))
    })
    .then((result) => {
      return fetchedCart.setProducts(null)
    })
    .then((result) => {
      res.redirect("/orders")
    })
    .catch((err) => console.log(err))
}

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.render("shop/order", {
        path: "/orders",
        pageTitle: "Orders",
        orders: orders,
      })
    })
    .catch((err) => console.log(err))
}
