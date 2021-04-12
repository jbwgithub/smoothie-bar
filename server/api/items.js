const router = require('express').Router()
const {Item} = require('../db/models')

router.get('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id)
    res.send(item)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll()
    res.send(items)
  } catch (error) {
    next(error)
  }
})

// ONLY UPDATES BY DECREASING ITEM'S STOCK COUNT
router.put('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id)
    item.stock = item.stock - req.body.quantity
    await item.save()

    res.send(item)
  } catch (error) {
    next(error)
  }
})

module.exports = router
