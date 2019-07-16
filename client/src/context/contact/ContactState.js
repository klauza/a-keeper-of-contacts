// this is state file
import React, { useReducer } from 'react'; // hook to accessing state and dispatching to reducer

import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS
} from '../types';

const ContactState = props => { // create initial state
 const initialState = {
   contacts: null,
   current: null,    // whatever contact is clicked and going to be edited, will be put into that piece of state
   filtered: null,    // array of filtered contacts matched with whatever is written into input
   error: null
  };

  // pulling out a state and dispatch from reducer by useReducer hook
  const [state, dispatch] = useReducer(contactReducer, initialState); // state - for accessing what's in our state | dispatch - allows to dispatch objects to reducer

  // ACTIONS
  // get contacts
  //hit the backend's api/contacts with GET request
  const getContacts = async () => {

    try{
        const res = await axios.get('/api/contacts'); // send a contact and a config(header)
        
        dispatch({ type: GET_CONTACTS, payload: res.data });

    } catch(err){
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  }

  // add contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try{
        const res = await axios.post('/api/contacts', contact, config); // send a contact and a config(header)
        
        dispatch({ type: ADD_CONTACT, payload: res.data });

    } catch(err){
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  }
 // delete contact
 const deleteContact = (id) => {
  dispatch({ type: DELETE_CONTACT, payload: id })
 }

 // clear contacts
 const clearContacts = () => {    
  dispatch({ type: CLEAR_CONTACTS }); // payload isn't going to be send, because we are setting everything to null
 }

 // set current contact
 const setCurrent = (contact) => {    // grabbing the contact to edit
  dispatch({ type: SET_CURRENT, payload: contact })
 }
 // clear current contact
 const clearCurrent = () => {    
  dispatch({ type: CLEAR_CURRENT }) // payload isn't going to be send, because we are setting everything to null
 }
 // update contact
 const updateContact = (contact) => {   
  dispatch({ type: UPDATE_CONTACT, payload: contact })
 }
 // filter contacts
 const filterContacts = (text) => {    
  dispatch({ type: FILTER_CONTACTS, payload: text })
 }
 // clear filter
 const clearFilter = () => {    
  dispatch({ type: CLEAR_FILTER }) 
 }
 
 return (   // returning a provider. Wrapping entire app with this context
  <ContactContext.Provider 
  value={{ 
    contacts: state.contacts,
    current: state.current,
    filtered: state.filtered,
    error: state.error,
    getContacts,
    addContact,      // if we want to access anything through a component we need to add it here
    deleteContact,
    setCurrent,
    clearCurrent,
    updateContact,
    filterContacts, 
    clearFilter,
    clearContacts
    }}>
    {props.children}
  </ContactContext.Provider>
 )
};

export default ContactState;