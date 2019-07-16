import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {

  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if(isAuthenticated) {   
      props.history.push('/');  // redirecting to home page if user authenticated
    }

    if(error === 'Invalid Credentials'){    // must be the same message as in /routes/auth
      setAlert(error, 'danger');
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);  // we want to run the error when the error is added changes -> is added to state
 

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
    
    if(email === '' || password === ''){
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({
        email,
        password
      })
    }
  }

  return (
    <div className="form-container">
      <h1>
        Account <div className="text-primary">Login</div>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" value={email} onChange={onChange} required/>
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
