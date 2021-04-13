const { DataTypes } = require("sequelize")

const sequelize = require("../util/database")

const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageuri: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})
module.exports = Product

// const Cart = require("./cart")
// const db = require("../util/database")

// module.exports = class Product {
//   constructor(title, description, price, imageUrl, id) {
//     this.title = title
//     this.description = description
//     this.price = price
//     this.imageUrl = imageUrl
//     this.id = id
//   }
//   save() {
//     return db.query(
//       "INSERT INTO products (title, description, price, imageuri) VALUES($1, $2, $3, $4)",
//       [this.title, this.description, this.price, this.imageUrl],
//     )
//   }
//   static deleteById(id) {}
//   static fetchAll() {
//     return db.query("SELECT * FROM products")
//   }
//   static findById(id) {
//     return db.query("SELECT * FROM products WHERE id = $1", [id])
//   }
// }
