// /* global describe beforeEach it */

// const {expect} = require('chai');
// const request = require('supertest');
// const db = require('../db');
// const app = require('../index');
// const User = db.model('user');

// describe('User routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true});
//   });

//   describe('/api/users/', () => {
//     const codysEmail = 'cody@puppybook.com';
//     const codysFirstName = 'cody';
//     const codysLastName = 'codyLastName';
//     const codysPassword = '123';
//     const codysFlag = 1;
//     beforeEach(() => {
//       return User.create({
//         email: codysEmail,
//         firstName: codysFirstName,
//         lastName: codysLastName,
//         password: codysPassword,
//         flag: codysFlag
//       });
//     });

//     it('GET /api/users', async () => {
//       const res = await request(app)
//         .get('/api/users')
//         .expect(200);

//       expect(res.body).to.be.an('array');
//       expect(res.body[0].email).to.be.equal(codysEmail);
//     });
//   }); // end describe('/api/users')
// }); // end describe('User routes')
