const User = require('./user')
const Item = require('./item')
const Order = require('./order')
const ItemOrders = require('./itemOrders')

// Associations:
Order.belongsTo(User)
User.hasMany(Order)

Order.belongsToMany(Item, {through: ItemOrders})
Item.belongsToMany(Order, {through: ItemOrders})

module.exports = {
  User,
  Item,
  Order,
  ItemOrders
}
