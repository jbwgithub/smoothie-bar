'use strict'
const db = require('../server/db')
const {User, Order, Item} = require('../server/db/models')
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  const users = await Promise.all([
    User.create({
      firstName: 'cody',
      lastName: 'codyLastName',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'murphy',
      lastName: 'Smith',
      email: 'murphy@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'danny',
      lastName: 'gutmann',
      email: 'danny@gmail.com',
      password: 'danny123',
      flag: 1
    })
  ])
  const items = await Promise.all([
    Item.create({
      name: 'Strawberry Smoothie',
      description: 'Ingredients...',
      price: 899,
      stock: 99,
      region: 'United States'
    }),
    Item.create({
      name: 'Chocolate Peanut Butter Smoothie',
      description: 'Ingredients...',
      price: 999,
      stock: 99,
      region: 'United States'
    }),
    Item.create({
      name: 'Strawberry-Banana Smoothie',
      description: 'Ingredients...',
      price: 2500,
      stock: 99,
      region: 'United States'
    }),
    Item.create({
      name: 'Greens Smoothie',
      description: 'Ingredients...',
      price: 15000,
      stock: 99,
      region: 'United States'
    }),
    Item.create({
      name: 'Bluberry Crunch Smoothie',
      description: 'Ingredients...',
      price: 15000,
      stock: 99,
      region: 'United States'
    })
  ])
  const orders = await Promise.all([
    Order.create({total: 10, status: 'pending', userId: 2}),
    Order.create({total: 189, status: 'completed', userId: 2}),
    Order.create({total: 121, status: 'pending', userId: 1}),
    Order.create({total: 9, status: 'completed', userId: 3})
  ])
  console.log(`seeded ${items.length} items`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}
// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}
// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}
// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
