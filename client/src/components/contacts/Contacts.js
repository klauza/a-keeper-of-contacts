// pull contacts from a state in here and then looping through them (map) and output in ContactItem for each one
import React, { Fragment, useContext } from 'react'
import ContactContext from '../../context/contact/contactContext';

import ContactItem from './ContactItem';


const Contacts = () => {
  const contactContext = useContext(ContactContext); 
  // now there is an access to any state/methods associated to this context

  const { contacts, filtered } = contactContext;

  if(contacts.length === 0){
    return <h4>Please add a contact</h4>
  }

  return (
    <Fragment>
      {/* check if there is anything in 'filtered' state */}
      {filtered !== null ? 
        filtered.map(contact => (<ContactItem key={contact._id} contact={contact} />)) 
        :
        contacts.map(contact => (<ContactItem key={contact._id} contact={contact} />))
      }

     
    </Fragment>
  )
}


export default Contacts