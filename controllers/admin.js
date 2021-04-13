const Product = require("../models/product")

exports.getAddProducts = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  })
}

exports.postAddProducts = (req, res) => {
  const title = req.body.title
  const imageUrl = req.body.imageuri
  const price = req.body.price
  const description = req.body.description
  req.user
    .createProduct({
      title: title,
      price: price,
      description: description,
      imageuri: imageUrl,
    })
    .then((result) => {
      res.redirect("/admin/products")
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect("/")
  }
  const prodId = req.params.productId
  req.user
    .getProducts({ where: { id: prodId } })
    // Product.findByPk(prodId)
    .then((products) => {
      const product = products[0]
      if (!product) {
        return res.redirect("/")
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product,
      })
    })
    .catch((err) => console.log(err))
}

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  // Product.destroy({
  //   where: {
  //     id: prodId
  //   }
  // })
  // res.redirect("/admin/products")
  Product.findByPk(prodId)
    .then((product) => {
      product.destroy()
      res.redirect("/admin/products")
    })
    .catch((er) => console.log(er))
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice = req.body.price
  const updatedDescription = req.body.description
  const updatedImageUrl = req.body.imageuri
  Product.findByPk(prodId)
    .then((product) => {
      ;(product.title = updatedTitle),
        (product.price = updatedPrice),
        (product.description = updatedDescription),
        (product.imageuri = updatedImageUrl)
      return product.save()
    })
    .then((result) => {
      res.redirect("/admin/products")
    })
    .catch((err) => console.log(err))
}

exports.adminProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/product", {
        prods: products,
        pageTitle: "Admin Products",
        hasProducts: products.length > 0,
        path: "/admin/products",
      })
    })
    .catch((err) => console.log(err))
}
