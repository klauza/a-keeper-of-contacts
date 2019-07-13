import React, { useState } from 'react'

const Login = () => {

  // state
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const {email, password} = user;
  
  const onChange = (e) => {
    setUser({ 
      ...user,  // current value
      [e.target.name]: e.target.value   // setting current value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    // method to log in the user
    console.log('Login submit');
  }

  return (
    <div className="form-container">
      <h1>
        Account <div className="text-primary">Login</div>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} />
        </div>
        <input type="submit" value="Login" className="btn btn-primary btn-block" />
      </form>
    </div>
  )
}

export default Login
