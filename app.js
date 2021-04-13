const path = require("path")
const express = require("express")

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

const adminRoutes = require("./routes/admin")
const shopRoutes = require("./routes/shop")
const controllerError = require("./controllers/error")
const db = require("./util/database")

app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(express.static(path.join(__dirname, "public")))
app.use("/admin", adminRoutes)
app.use(shopRoutes)

app.use(controllerError.notFound)
app.listen(4000)
