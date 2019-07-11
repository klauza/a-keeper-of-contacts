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
    default: 
      return state;

  }

};