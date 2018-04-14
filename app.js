const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();


require('./models/EVuser');

const auth = require('./routes/auth');
require('./config/passport')(passport);



// Connect to mongoose
mongoose.connect('mongodb://harshit:scooby1234@ds257077.mlab.com:57077/social-dev'
)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//setting global variables
app.use(function(req, res, next){
    res.locals.user = req.user || null;
    next();
  });

  app.use('/auth', auth);
  port = 8000;

  app.listen(port, () => {
      console.log(`server started on ${port}`);
  })