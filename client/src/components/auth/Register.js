import React, { useState, useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Register = () => {

  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;  // pulling out setAlert from the context

  // state
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  
  const {name, email, password, password2} = user;
  
  const onChange = (e) => {
    setUser({ 
      ...user,  // current value
      [e.target.name]: e.target.value   // setting current value
    })
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    // method to register new user
    if(name === '' || email === '' || password === ''){
      setAlert('Please fill all the fields', 'danger');
    } else if(password !== password2){
      setAlert('Passwords are not equal', 'danger');
    } else{
      console.log('Register submit');
    }
    
  }
  
  
  return (
    <div className="form-container">
      <h1>
        Account <div className="text-primary">Register</div>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required minLength="6"/>
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" name="password2" value={password2} onChange={onChange}/>
        </div>
        <input type="submit" value="Register" className="btn btn-primary btn-block" />
      </form>
    </div>
  )
}

export default Register
