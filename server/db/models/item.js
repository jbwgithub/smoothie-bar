const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'No Description'
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 1000000
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpT1MRQLFXEGmVPpNNQlZ7nwyDMrxh44sk9g&usqp=CAU',
    validate: {
      isUrl: true
    }
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 1000
    }
  },
  region: {
    type: Sequelize.STRING
  }
})

module.exports = Item
