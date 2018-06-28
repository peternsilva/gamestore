var express = require('express');
var router = express.Router();
const knex = require('../knex');
var jwt = require('jsonwebtoken')
require('dotenv').config()
var authorize = require('../authorize')

// LIST all products
router.get('/', authorize, (req, res, next) => {
  // USE KNEX TO GET ALL PRODUCTS
  knex('products')
  .then((data) => {
    console.log('data', data)
    res.send(data)
  })
})

// READ one product
router.get('/:productid', authorize, (req, res, next) => {
  // USE KNEX TO GET A SPECIFIC PRODUCT
  knex('products')
  .where('id', req.params.productid)
  .then((data) => {
    console.log('the specific user', data)
    res.send(data)
  })
})

// // CREATE one users
// router.post('/', (req, res, next) => {
//   // Look for some provided Body data
//   // req.body
//   console.log('req.body', req.body)
// 
//   // create new user in DB with KNEX
//   // SQL INSERT
//   knex('users')
//   .insert({name: req.body.name})
//   .returning('*')
//   .then((result) => {
//     let insertedRecord = result[0]
//     console.log('data', insertedRecord)
//     // conclude the route with res.send
//     res.send(insertedRecord)
//   })
// 
// })
// 
// // UPDATE one user, whom already exists in DB
// router.put('/:userid', (req, res, next) => {
//   console.log('THE PUT ROUTE');
//   // look up a specific user in the database
//   knex('users')
//   .where('id', req.params.userid)
//   .then((data) => {
//     console.log('the specific user', data)
// 
//     // once found, if found, update that user record's data
//     if(data.length) {
//       // user was found, go ahead and update
//       knex('users')
//       .update({
//         name: req.body.name
//       })
//       .where('id', req.params.userid)
//       .returning('*')
//       .then((updateResult) => {
//         console.log('updateResult', updateResult)
// 
//         // respond with the user object, represents a record from the user table
//         // conclude the route
//         res.send(updateResult[0])
//       })
//     }
//   })
// })
// 
// 
// // DELETE a user, a specific user
// router.delete('/:userid', (req, res, next) => {
//   // lookup a userid in the DB, if exists, delete it
//   knex('users')
//   .where('id', req.params.userid)
//   .del()
//   .then((result) => {
//     console.log('result', result)
//     if( result ) {
//       res.send({ 'success': result })
//     } else {
//       throw new Error('Couldnt find the user to delete')
//     }
//   })
//   .catch((err) => {
//     next(err)
//   })
// })


module.exports = router;
