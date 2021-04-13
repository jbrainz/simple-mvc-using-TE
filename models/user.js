const { DataTypes } = require("sequelize")

const sequelize = require("../util/database")

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
})

module.exports = User
