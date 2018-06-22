var express = require('express');
var router = express.Router();
const knex = require('../knex');

// LIST all users
router.get('/', (req, res, next) => {
  // USE KNEX TO GET ALL USERS
  knex('users')
  .then((data) => {
    console.log('data', data)
    res.send(data)
  })
})

// READ one user
router.get('/:userid', (req, res, next) => {
  // USE KNEX TO GET A SPECIFIC USER
  knex('users')
  .where('id', req.params.userid)
  .then((data) => {
    console.log('the specific user', data)
    res.send(data)
  })
})

// CREATE one users
router.post('/', (req, res, next) => {
  // Look for some provided Body data
  // req.body
  console.log('req.body', req.body)

  // create new user in DB with KNEX
  // SQL INSERT
  knex('users')
  .insert({name: req.body.name})
  .returning('*')
  .then((result) => {
    let insertedRecord = result[0]
    console.log('data', insertedRecord)
    // conclude the route with res.send
    res.send(insertedRecord)
  })

})

// UPDATE one user

// DELETE a user


module.exports = router;
