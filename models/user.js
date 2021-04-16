const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          requried: true,
        },
      },
    ],
  },
})

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString()
  })
  let newQuantity = 1
  console.log(cartProductIndex)
  const updatedCartItems = [...this.cart.items]
  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1
    updatedCartItems[cartProductIndex].quantity = newQuantity
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    })
  }
  const updatedCart = {
    items: updatedCartItems,
  }
  this.cart = updatedCart
  return this.save()
}

userSchema.methods.deleteFromCarts = function (prodId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== prodId.toString()
  })
  this.cart.items = updatedCartItems
  return this.save()
}

userSchema.methods.clearCart = function () {
  this.cart = { items: [] }
  return this.save()
}

module.exports = mongoose.model("User", userSchema)

//VANILLA MONGODB QUERIES
// class User {
//   constructor(username, email, cart, id) {
//     this.username = username
//     this.email = email
//     this.cart = cart // {items: [...]}
//     this._id = id
//   }
//   save() {
//     const db = getDB()
//     return db.collection("users").insertOne(this)
//   }

//   addTocart(product) {
//     const cartProductIndex = this.cart.items.findIndex((cp) => {
//       return cp.productId.toString() === product._id.toString()
//     })
//     let newQuantity = 1
//     console.log(cartProductIndex)
//     const updatedCartItems = [...this.cart.items]
//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1
//       updatedCartItems[cartProductIndex].quantity = newQuantity
//     } else {
//       updatedCartItems.push({
//         productId: new mongodb.ObjectID(product._id),
//         quantity: newQuantity,
//       })
//     }
//     const updatedCart = {
//       items: updatedCartItems,
//     }
//     const db = getDB()
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectID(this._id) },
//         { $set: { cart: updatedCart } },
//       )
//   }
//   getCart() {
//     const db = getDB()
//     const prodIds = this.cart.items.map((e) => {
//       return e.productId
//     })
//     return db
//       .collection("products")
//       .find({ _id: { $in: prodIds } })
//       .toArray()
//       .then((products) => {
//         return products.map((p) => {
//           return {
//             ...p,
//             quantity: this.cart.items.find((e) => {
//               return e.productId.toString() === p._id.toString()
//             }).quantity,
//           }
//         })
//       })
//       .catch((err) => console.log(err))
//   }

//   deleteById(prodId) {
//     const updatedCartItems = this.cart.items.filter((item) => {
//       return item.productId.toString() !== prodId.toString()
//     })
//     const db = getDB()
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectID(this._id) },
//         { $set: { cart: { items: updatedCartItems } } },
//       )
//   }
//   addOrder() {
//     const db = getDB()
//     return this.getCart()
//       .then((product) => {
//         const order = {
//           items: product,
//           user: {
//             _id: new mongodb.ObjectID(this._id),
//             name: this.username,
//           },
//         }
//         return db.collection("orders").insertOne(order)
//       })
//       .then((res) => {
//         this.cart = {
//           items: [],
//         }
//         return db
//           .collection("users")
//           .updateOne(
//             { _id: new mongodb.ObjectID(this._id) },
//             { $set: { cart: { items: [] } } },
//           )
//       })
//   }

//   getOders() {
//     const db = getDB()
//     return db
//       .collection("orders")
//       .find({ "user._id": new mongodb.ObjectID(this._id) })
//       .toArray()
//   }

//   static findById(id) {
//     const db = getDB()
//     return db
//       .collection("users")
//       .findOne({ _id: new mongodb.ObjectID(id) })
//       .then((user) => {
//         console.log(user)
//         return user
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }
// }
// module.exports = User
