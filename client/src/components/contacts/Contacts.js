// pull contacts from a state in here and then looping through them (map) and output in ContactItem for each one
import React, { Fragment, useContext } from 'react'
import ContactContext from '../../context/contact/contactContext';


const Contacts = () => {
  const contactContext = useContext(ContactContext); 
  // now there is an access to any state/methods associated to this context

  const { contacts } = contactContext;

  return (
    <Fragment>
      {contacts.map(contact => <h3>{contact.name}</h3>)}
    </Fragment>
  )
}


export default Contacts