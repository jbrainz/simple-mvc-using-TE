const Product = require("../models/product")

const mongodb = require("mongodb")

const ObjectID = mongodb.ObjectID

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
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageuri: imageUrl,
    userId: req.user,
  })
  product
    .save()
    .then((result) => {
      res.redirect("/admin/products")
    })
    .catch((err) => {
      console.log(err)
    })
  // req.user
  //   .createProduct({
  //     title: title,
  //     price: price,
  //     description: description,
  //     imageuri: imageUrl,
  //   })
  // const product = new Product(
  //   title,
  //   price,
  //   description,
  //   imageUrl,
  //   null,
  //   req.user._id,
  // )
  // product
  //   .save()
  //   .then((result) => {
  //     res.redirect("/admin/products")
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect("/")
  }
  const prodId = req.params.productId
  Product.findById(prodId)
    // Product.findByPk(prodId)
    .then((product) => {
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

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice = req.body.price
  const updatedDescription = req.body.description
  const updatedImageUrl = req.body.imageuri
  Product.findById(prodId)
    .then((product) => {
      product.title = updatedTitle
      product.price = updatedPrice
      product.description = updatedDescription
      product.imageuri = updatedImageUrl
      return product.save()
    })
    .then((result) => {
      res.redirect("/admin/products")
    })
    .catch((err) => console.log(err))
}

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findByIdAndRemove(prodId)
    .then(() => {
      res.redirect("/admin/products")
    })
    .catch((er) => console.log(er))
}

exports.adminProducts = (req, res, next) => {
  Product.find()
    // .select("title price -_id")
    // .populate("userId")
    .then((products) => {
      console.log(products)
      res.render("admin/product", {
        prods: products,
        pageTitle: "Admin Products",
        hasProducts: products.length > 0,
        path: "/admin/products",
      })
    })
    .catch((err) => console.log(err))
}
