const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// bringing json web token
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public

router.post('/', [
  check('name', 'Please add a name').not().isEmpty(),   // setting the checks
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6})
], 
async (req, res) => {  
  const errors = validationResult(req);
  if(!errors.isEmpty()) {   // checking if errors is empty
    return res.status(400).json({ errors: errors.array() }) 
    // returns if the user did fill the fields correctly, and also send some json data which come from errors variable above
  }

  const { name, email, password } = req.body;
  
  try{ // check to see if there is a user with that email already exists
    let user = await User.findOne({ email: email}); //mongoose method. Find a user based on field 'email'

    if(user){ // if user exist we want to return a response
      return res.status(400).json({msg: 'User already exists'}) // 400 - bad request
    }

    user = new User({
      name: name,
      email: email,
      password: password
    })

    //encrypting the password
    const salt = await bcrypt.genSalt(10); // returns a promise, but we laready use async await, so no need to do .then ... 
    // number in brackets is a power of enrypting

    //hashingthe passwd
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    //JWT start here-------------------------------------- 
    //res.send('User saved'); 
    const payload = { // we send only user id, because based on that, we can have access to the rest of data, eg. contacts etc
      user: {
        id: user.id
      }
    }

    // generating the token
    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 360000 // time in seconds when token expires, 3600 = 1h, best solution
    }, /*callback*/ (err, token) => {
      if(err) throw err;
      res.json({ token });
    })

  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error'); // 500 - server error
  }
}); 
module.exports = router;
