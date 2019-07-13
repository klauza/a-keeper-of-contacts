import React, { useState } from 'react'

const Register = () => {

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
    console.log('Register submit');
  }

  
  return (
    <div className="form-container">
      <h1>
        Account <div className="text-primary">Register</div>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" name="password2" value={password2} onChange={onChange} />
        </div>
        <input type="submit" value="Register" className="btn btn-primary btn-block" />
      </form>
    </div>
  )
}

export default Register
