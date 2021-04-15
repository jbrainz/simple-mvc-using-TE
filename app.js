const path = require("path")
const express = require("express")

const app = express()
app.set("view engine", "ejs")
app.set("views", "views")

const adminRoutes = require("./routes/admin")
const shopRoutes = require("./routes/shop")
const controllerError = require("./controllers/error")

const mongoConnect = require("./util/database").mongoConnect
const User = require("./models/user")

app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(express.static(path.join(__dirname, "public")))

app.use((req, res, next) => {
  User.findById("60772d68683b58d87795d0be")
    .then((user) => {
      req.user = new User(user.username, user.email, user.cart, user._id)
      next()
    })
    .catch((err) => console.log(err))
})

app.use("/admin", adminRoutes)
app.use(shopRoutes)
app.use(controllerError.notFound)

mongoConnect(() => {
  app.listen(4000)
})

// const sequelize = require("./util/database")
// const Product = require("./models/product")
// const Cart = require("./models/cart")
// const CartItem = require("./models/cart-item")
// const OrderItem = require("./models/order-item")
// const Order = require("./models/order")

// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" })
// User.hasMany(Product)
// User.hasOne(Cart)
// Cart.belongsTo(User)
// Cart.belongsToMany(Product, { through: CartItem })
// Product.belongsToMany(Cart, { through: CartItem })
// Order.belongsTo(User)
// User.hasMany(Order)
// Order.belongsToMany(Product, { through: OrderItem })

// sequelize
//   // .sync({ force: true })
//   .sync()
//   .then((result) => {
//     return User.findByPk(1)
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({
//         name: "max",
//         email: "test@mail.com",
//       })
//     }
//     return user
//   })
//   .then((user) => {
//     //  console.log(user)
//     return user.createCart()
//   })
//   .then((cart) => {
//     app.listen(4000)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
