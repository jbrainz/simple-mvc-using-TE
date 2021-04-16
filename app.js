const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session)
const uri = require("./util/mongoUri")
const csrf = require("csurf")
const cookieParser = require("cookie-parser")

const csrfProtection = csrf({ cookie: true })

const app = express()
const store = new MongoDBStore({
  uri: uri,
  collection: "sessions",
})
app.use(cookieParser())
app.use(csrfProtection)

app.set("view engine", "ejs")
app.set("views", "views")

const adminRoutes = require("./routes/admin")
const shopRoutes = require("./routes/shop")
const auth = require("./routes/auth")

const controllerError = require("./controllers/error")
const User = require("./models/user")

app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(express.static(path.join(__dirname, "public")))

app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
)

app.use((req, res, next) => {
  if (!req.session.user) {
    return next()
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user
      next()
    })
    .catch((err) => console.log(err))
})

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn
  res.locals.csrfToken = req.csrfToken()
  next()
})

app.use(auth)
app.use("/admin", adminRoutes)
app.use(shopRoutes)
app.use(controllerError.notFound)

mongoose
  .connect(uri)
  .then(() => {
    app.listen(4000)
  })
  .catch((err) => console.log(err))

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
