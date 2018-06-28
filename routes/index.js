var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/dashboard', (req, res, next) => {
  res.send('MY COOL LOGGED IN DASHBOARD')
})

module.exports = router;
