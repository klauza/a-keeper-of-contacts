import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
// useRef - for forms
const ContactFiltered = () => {
  const contactContext = useContext(ContactContext);
  const text = useRef('');
  // const { filterContacts, clearFilter, filtered } = contactContext;  => destructured 

  useEffect(() => {
    if(contactContext.filtered == null){  // if filter is null, I want the value to be empty, we dont want to keep text inside of it
      text.current.value = '';
    } else {

    }
  });

  const onChange = e => {
    if(text.current.value !== ''){  // text.current.value => gives the actual value of the input
      contactContext.filterContacts(e.target.value);  // passing the value from input to the method
    } else{
      contactContext.clearFilter();
    }
  }
  
  return (
    <form>
      <input ref={text} type="text" placeholder="Filter contacts..." onChange={onChange} />
    </form>
  )
}

export default ContactFiltered
