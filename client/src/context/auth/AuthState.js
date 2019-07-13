import React, { useReducer } from 'react'; 
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => { // create initial state
 const initialState = {
   token: localStorage.getItem('token'),
   isAuthenticated: null,
   loading: true,
   user: null,
   error: null
  };

 // pulling out a state and dispatch from reducer by useReducer hook
 const [state, dispatch] = useReducer(authReducer, initialState); // state - for accessing what's in our state | dispatch - allows to dispatch objects to reducer

 // ACTIONS
 // Load user

 // Register user

 // Login user

 // Logout - destroy the token and clear everything up

 // Clear errors 
 
 return (   // wrapping the app with this provider
  <AuthContext.Provider 
  value={{ 
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    user: state.user,
    error: state.error

  }}>
    {props.children}
  </AuthContext.Provider>
 )
};

export default AuthState;