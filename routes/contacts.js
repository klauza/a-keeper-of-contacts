// Contacts will have the most routes (4) because it's a CRUD route, create, read, update, delete
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');     // to protect the routes
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET api/contacts
// @desc    Get all users contacts - for a specific user that is logged in
// @access  Private

router.get('/', auth, async (req, res) => {   
  try{
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 }); // -1  the most recent contact first
    res.json(contacts);
  } catch (err){
    console.error(err.message);
    res.status(500).send('server error');
  }
}); 

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private

router.post('/', 
  [auth, 
    [
      check('name', 'Name is required').not().isEmpty()
    ]
  ], async (req, res) => { 
    const errors = validationResult(req);
    if(!errors.isEmpty()) {   // checking if errors is empty
      return res.status(400).json({ errors: errors.array() }) 
      // returns if the user did fill the fields correctly, and also send some json data which come from errors variable above
    }

    const {name, email, phone, type} = req.body;

    try{
      const newContact = new Contact({
        name, 
        email,
        phone,
        type,
        user: req.user.id // we get from request.user because we make auth middleware auth[]
      });

      const contact = await newContact.save(); // newContact -> a contact instance
      res.json(contact);  //returning the contact to the client
    } catch(err){
      console.error(err.message);
      res.status(500).send('server error');
    }
  }); 

// @route   PUT api/contacts/:id       '/:id'=> because we have to specify which contact we want to update
// @desc    Update contact
// @access  Private

router.put('/:id', auth, async(req, res) => { // auth- so we can have access to the user and a token
  const {name, email, phone, type} = req.body;

  // build a contact object based on the fields submitted
  const contactFields = {}; 
  if(name) contactFields.name = name; // check if it's included and then add to the contact fields
  if(email) contactFields.email = email;
  if(phone) contactFields.phone = phone;
  if(type) contactFields.type = type;

  try{
    let contact = await Contact.findById(req.params.id); //will fint a contact by id

    if(!contact) return res.status(404).json({ msg: 'Contact not found' });

    // we need to make sure that the user owns the contact, we dont want someone's else to update ours
    if(contact.user.toString() !== req.user.id){
      return res.status(401).json({ msg: 'Not authorized' });  //401 unauthorized
    }
    
    // we make the update here
    contact = await Contact.findByIdAndUpdate(
      req.params.id, // first parameter
      { $set: contactFields},  // second parameter ...
      { new: true } // if this contact doesn't exist, then create it
    ), 
    
    res.json(contact); // sending the updated contact  

  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }

}); 

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private

router.delete('/:id', auth, async (req, res) => { 
  
  try{
    let contact = await Contact.findById(req.params.id); //will fint a contact by id

    if(!contact) return res.status(404).json({ msg: 'Contact not found' });

    // we need to make sure that the user owns the contact, we dont want someone's else to update ours
    if(contact.user.toString() !== req.user.id){
      return res.status(401).json({ msg: 'Not authorized' });  //401 unauthorized
    }
    
    await Contact.findByIdAndRemove(req.params.id);  // we dont need a variable, we just call it
    
    
    res.json({msg: 'Contact removed'}); // sending the info 

  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }

}); 

module.exports = router;
