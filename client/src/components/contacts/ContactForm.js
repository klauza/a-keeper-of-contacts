import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { current } = contactContext;    // destructuring

  // we want to fill the form based on if there is anything in current value
  // and we want to run it as soon as it's mounted or created [ useEffect - mimics ComponentDidMount ]

  useEffect(() => {
    if(current !== null){   // if it's not empty, fill the form
      setContact(current);  // it's a complete contact we have clicked on
    } else {
      setContact({    
        name: '',
        email: '',
        phone: '',
        type: 'personal' 
      });
    }
  }, [contactContext, current]) // we need to add dependencies here
  // we want useEffect to happen when contactContext or current is changed


  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal' // default val
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value }); // copy ... the current array.    
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(current === null){   // if there is nothing in 'current' state, we want to add a new contact
      contactContext.addContact(contact); 
    } else {
      contactContext.updateContact(contact);    // contact - state of the form
    }
    clearAll();
    setContact({    // clearing the form
      name: '',
      email: '',
      phone: '',
      type: 'personal' 
    })
  }

  const clearAll = () => {
    contactContext.clearCurrent();
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary"> {current ? 'Edit contact' : 'Add contact'} </h2>
      <input type="text" placeholder="name" name="name" value={name} onChange={onChange} />
      <input type="email" placeholder="email" name="email" value={email} onChange={onChange} />
      <input type="text" placeholder="phone" name="phone" value={phone} onChange={onChange} />
      <h5>Contact type</h5>
      <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange} />Personal{' '}
      <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange} />Professional{' '}
      <div>
        <input type="submit" value={current ? 'Update contact' : 'Add contact'} className="btn btn-primary btn-block" />
      </div>

      {current && <div className="btn btn-light btn-block" onClick={clearAll}>Clear</div>}
    </form>
  )
}
export default ContactForm
