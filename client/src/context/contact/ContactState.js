// this is state file
import React, { useReducer } from 'react'; // hook to accessing state and dispatching to reducer
import uuid from 'uuid'; // to generate a random ID before working with backend
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => { // create initial state
 const initialState = {
   contacts: [  // hardcoded contacts for now
    {
      id: 1,
      name: 'Marius Gonciarz',
      email: 'gonma@gmail.com',
      phone: '222-345-5432',
      type: 'personal'
    },
    {
      id: 2,
      name: 'John Snow',
      email: 'snow@gmail.com',
      phone: '553-115-5433',
      type: 'personal'
    },
    {
      id: 3,
      name: 'Harry Pitter',
      email: 'pitter@gmail.com',
      phone: '111-222-3333',
      type: 'professional'
    }
   ]
 };

 // pulling out a state and dispatch from reducer by useReducer hook
 const [state, dispatch] = useReducer(contactReducer, initialState); // state - for accessing what's in our state | dispatch - allows to dispatch objects to reducer

 // ACTIONS
 // add contact
 const addContact = (contact) => {
  contact.id = uuid.v4(); // generate random ID. v4 is a method. --- Eventually ID will come from a DB.
  dispatch({ type: ADD_CONTACT, payload: contact })
}
 // delete contact

 // set current contact

 // clear current contact

 // update contact

 // filter contacts
 
 // clear filter

 return (   // returning a provider. Wrapping entire app with this context
  <ContactContext.Provider 
  value={{ 
    contacts: state.contacts,
    addContact      // if we want to access anything through a component we need to add it here
    }}>
    {props.children}
  </ContactContext.Provider>
 )
};

export default ContactState;