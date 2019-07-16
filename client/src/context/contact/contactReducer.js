import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CONTACTS
} from '../types';

export default (state, action) => {
  switch(action.type){  // js switch for looking at the type

    case GET_CONTACTS:
      return{
        ...state,
        contacts: action.payload, // fill the contacts state with the payload
        loading: false
      };

    case ADD_CONTACT:
      return {
        ...state,     // current, original state
        contacts: [action.payload, ...state.contacts],   //adding the contact to existing contacts - will be first from top, and then the rest
        loading: false
      };

    case UPDATE_CONTACT:
      return{
        ...state,
        contacts: state.contacts.map((contact) => 
          contact.id === action.payload.id ? action.payload : contact   // each contact, match the ids. If true, return updated contact else return contact as it was
        ),
        loading: false
      };

    case DELETE_CONTACT:
      return{
        ...state,
        contacts: state.contacts.filter(contact => contact._id !== action.payload), // filter out the contact we want to delete from the UI // display all contacts beside the one with ID of the contact we selected
        // it looks at contact.id and it's going to return any contact that are not the current ID. So our specific chosen contact will go away.
        loading: false
      };

    case CLEAR_CONTACTS:
      return{
        ...state,
        contacts: null,
        filtered: null,
        error: null,
        current: null
      }

    case SET_CURRENT:
      return{
        ...state,   // current value
        current: action.payload   // just put the sleected contact into current state
      };

    case CLEAR_CURRENT:
      return{
        ...state,
        current: null  // just setting the current back to null
      };
    
    case FILTER_CONTACTS:
      return{
        ...state,
        // take text to be filtered
        filtered: state.contacts.filter(contact => {    // for each contact
          const regex = new RegExp(`${action.payload}`, 'gi')   // {text to check}, global & insensitive
          return contact.name.match(regex) || contact.email.match(regex);
        })
      };

      case CLEAR_FILTER:
      return{
        ...state,
        filtered: null
      };

      case CONTACT_ERROR:
        return{
          ...state,
          error: action.payload
        };
      
    default: 
      return state;

  }

};