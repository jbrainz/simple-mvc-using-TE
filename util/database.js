const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("nodejs", "postgres", "postgres", {
  host: "jb",
  dialect: "postgres" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
})

module.exports = sequelize

// const pool = new Pool({
//   user: "postgres",
//   host: "jb",
//   database: "nodejs",
//   password: "postgres",
// })

//const sequelize = Sequelize('postgres://postgres:potgres@jb:5432/nodejs')
