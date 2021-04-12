const Sequelize = require('sequelize')
const db = require('../db')

const ItemOrders = db.define('itemOrders', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 1000
    }
  },
  purchasePrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 500000
    }
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 30000000
    }
  }
})

module.exports = ItemOrders
