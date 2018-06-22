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


module.exports = router;
