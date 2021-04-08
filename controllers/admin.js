const Product = require("../models/product")

exports.getAddProducts = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  })
}

exports.postAddProducts = (req, res) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const price = req.body.price
  const description = req.body.description
  const product = new Product(title, description, imageUrl, price)
  product.save()
  res.redirect("/")
}

exports.adminProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/product", {
      prods: products,
      pageTitle: "Admin Products",
      hasProducts: products.length > 0,
      path: "/admin/products",
    })
  })
}
