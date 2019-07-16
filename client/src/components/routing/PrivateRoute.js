import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

// we need to know if we are logged in or not

const PrivateRoute = ({ component: Component, ...rest}) => { // ...rest -> anything rest what's passed in 

  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  return (
    <Route { ...rest } render={props => !isAuthenticated && !loading ? 
      ( <Redirect to='/login' /> ) : 
      ( <Component {...props} /> )} 
    />
  )
}

export default PrivateRoute
