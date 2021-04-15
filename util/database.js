const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://pius:pius@cluster0.34euk.mongodb.net/nodejs-shop?retryWrites=true&w=majority",
  )
    .then((client) => {
      console.log("connected")
      _db = client.db()
      callback()
    })
    .catch((err) => {
      throw err
    })
}

const getDB = () => {
  if (_db) {
    return _db
  }
  throw "No Database Connected"
}

exports.mongoConnect = mongoConnect
exports.getDB = getDB

// const { Sequelize } = require("sequelize")

// const sequelize = new Sequelize("nodeJS", "postgres", "postgres", {
//   host: "jb",
//   dialect: "postgres" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
// })

// module.exports = sequelize

// const pool = new Pool({
//   user: "postgres",
//   host: "jb",
//   database: "nodejs",
//   password: "postgres",
// })

//const sequelize = Sequelize('postgres://postgres:potgres@jb:5432/nodejs')
