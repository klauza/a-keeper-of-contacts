import React, { useContext } from 'react'
import ContactContext from '../../context/contact/contactContext';


const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext); 
  const { deleteContact, setCurrent, clearCurrent } = contactContext;   // bring the methods so we can call them here

  const { _id, name, phone, email, type } = contact; 

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  }

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{' '} 
        <span style={{float: 'right'}} className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>
          {type.charAt(0).toUpperCase()+type.slice(1)}
        </span> 
      </h3>

      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i> {email}
          </li>
        )}

        {phone && (
          <li>
            <i className="fas fa-phone"></i> {phone}
          </li>
        )}
      </ul>

      <p>
        <button className="btn btn-dark btn-sm" onClick={() => setCurrent(contact)}>Edit</button>    {/* Calling the edit function directly here. Contact is coming from the prop*/}
        <button className="btn btn-danger btn-sm" onClick={onDelete} >Delete</button>
      </p>
    </div>
  )
}

export default ContactItem
