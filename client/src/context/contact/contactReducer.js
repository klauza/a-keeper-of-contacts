import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

export default (state, action) => {
  switch(action.type){  // js switch for looking at the type

    case ADD_CONTACT:
      return {
        ...state,     // current state
        contacts: [...state.contacts, action.payload]   //adding the contact to existing contacts
      }

    case DELETE_CONTACT:
      return{
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload) // filter out the contact we want to delete from the UI
        // it looks at contact.id and it's going to return any contact that are not the current ID. So our specific chosen contact will go away.
      }

    default: 
      return state;

  }

};