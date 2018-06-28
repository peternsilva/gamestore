var jwt = require('jsonwebtoken')
require('dotenv').config()

// AUTH MIDDLEWARE!
var authorize = (req, res, next) => {
  // jwt.verify to check the token
  // the token is in req.cookies.token
  // extract out the payload aka claim ticket
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if(err) {
        return next(new Error('YOU ARE NOT AUTHORIZED. THOU SHALL NOT PASS.'))
    }
    req.claim = payload
    next()
  })
}


module.exports = authorize;