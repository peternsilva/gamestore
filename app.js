var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bcrypt = require('bcrypt')
var knex = require('./knex')
var jwt = require('jsonwebtoken')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var productsRouter = require('./routes/products');
// var ordersRouter = require('./routes/orders');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/products', productsRouter);
// app.use('/orders', ordersRouter);

// REGISTER a user
app.post('/register', (req, res, next) => {
  console.log('/register was hit');
  
  // check the email doesn't already exist in users table
  knex('users')
  .where('email', req.body.email)
  .first()
  .then((user) => {
    if(user) {
      throw new Error('Oops that email is already used')
    }
    
    // hash the password
    var hashed = bcrypt.hashSync(req.body.password, 8)
    
    // create new user record with the email + hashed password
    knex('users')
    .insert({
      name: req.body.name,
      email: req.body.email,
      password: hashed
    })
    .returning('*')
    .then((result) => {
      res.redirect('/login')
    })
  })
  .catch((err) => {
    next(err)
  })
})

// LOGIN the user
app.post('/login', (req, res, next) => {
  // take in email, password
  // find the user with this email in the db
  knex('users')
  .where('email', req.body.email)
  .first()
  .then((user) => {
    if(user) {
      // use bcrypt.compare to compare to the hashed password in the db
      var passwordGood = bcrypt.compareSync(req.body.password, user.password)
      // if all is good, create the token, and attach it as a cookie to the response
      if(passwordGood) {
        // create token
        
      }
    } else {
      throw new Error('Could not find that user')
    }
  })
  .catch((err) => {
    next(err)
  })
  
  
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
