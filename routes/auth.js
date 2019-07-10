// auth has two routes: 1 - get the logged in user. 2 - logs in the user and gets a token
const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

const auth = require('../middleware/auth');   // protective route
// 1
// @route   GET api/auth
// @desc    Get logged in user
// @access  Private - cuz we are getting the user that is logged in

router.get('/', auth, async (req, res) => { 
  try{
    const user = await User.findById(req.user.id).select('-password') //findById-it's a mongoose method which returns a promise; [get the user from database]; 
                                                                      //('-password')-we dont want to return a password
    res.json(user);
  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
}); 

// 2
// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public - because we authenticate the token so you can access later private routes

router.post('/', [      // adding validation
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
],
async (req, res) => {   
  const errors = validationResult(req);   // checking for errors
  if(!errors.isEmpty()) {   
    return res.status(400).json({ errors: errors.array() }) 
  }

  const {email, password} = req.body;

  try{
    let user = await User.findOne({ email });   // see if the user exists by email

    if(!user){
      return res.status(400).json({ msg: 'Invalid Credentials'});
    }

    // if there is such user, continue...
    const isMatch = await bcrypt.compare(password, user.password); // (plaintext pwd, hash pwd)

    if(!isMatch){   // check if pwd matches
      return res.status(400).json({msg: 'Invalid Credentials'});
    }

    // continue if match...
    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 360000 
    }, /*callback*/ (err, token) => {
      if(err) throw err;
      res.json({ token });
    })



  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }

}); 
module.exports = router;
