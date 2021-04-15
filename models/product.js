const mongodb = require("mongodb")
const getDB = require("../util/database").getDB

class Product {
  constructor(title, price, description, imageuri, id, userId) {
    this.title = title
    this.price = price
    this.description = description
    this.imageuri = imageuri
    this._id = id ? new mongodb.ObjectID(id) : null
    this.userId = userId
  }
  save() {
    const db = getDB()
    let dbUpdate
    if (this._id) {
      //Update product
      dbUpdate = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this })
    } else {
      dbUpdate = db.collection("products").insertOne(this)
    }
    return dbUpdate
      .then((result) => {
        console.log("Done!")
      })
      .catch((err) => console.log(err))
  }
  static fetchAll() {
    const db = getDB()
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products
      })
      .catch((err) => console.log(err))
  }
  static findById(id) {
    const db = getDB()
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectID(id) })
      .next()
      .then((product) => {
        console.log(product)
        return product
      })
      .catch((err) => console.log(err))
  }
  static deleteById(prodId) {
    const db = getDB()
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectID(prodId) })
      .then(() => console.log("Deleted!"))
      .catch((err) => console.log(err))
  }
}
module.exports = Product

// const Product = sequelize.define("product", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: DataTypes.STRING,
//   price: {
//     type: DataTypes.DOUBLE,
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   imageuri: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// })

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
