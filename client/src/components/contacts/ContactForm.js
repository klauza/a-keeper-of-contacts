import React, { useState } from 'react'

const ContactForm = () => {
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

  return (
    <form>
      <h2 className="text-primary">add contact</h2>
      <input type="text" placeholder="name" name="name" value={name} onchange={onChange} />
      <input type="email" placeholder="email" name="email" value={email} onchange={onChange} />
      <input type="text" placeholder="phone" name="phone" value={phone} onchange={onChange} />
      <h5>Contact type</h5>
      <input type="radio" name="type" value="personal" checked={type === 'personal'} />Personal{' '}
      <input type="radio" name="type" value="professional" checked={type === 'professional'} />Professional{' '}
      <div>
        <input type="submit" value="Add Contact" className="btn btn-primary btn-block" />
      </div>
    </form>
  )
}
export default ContactForm
