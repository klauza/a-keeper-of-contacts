import React, { useReducer } from 'react'; 
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

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
  const loadUser = async () => {
    // load token into global headers
    if(localStorage.token){
      setAuthToken(localStorage.token);
    }
    
    try{
      const res = await  axios.get('/api/auth');  // this is a route that check the token and see if a user is valid

      dispatch({ type: USER_LOADED, payload: res.data});
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

 // Register user
  const register = async formData => {
    // it's a POST request, so we need a Content-type
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try{
      const res = await axios.post('/api/users', formData, config);   //returns a promise. We have a proxy set, so no need to puy localhost:5000/api/.. 
      
      dispatch({    // dispatchin to our reducer
        type: REGISTER_SUCCESS,
        payload: res.data   // paylod == response. res.data == token
      })

      loadUser();   // load the user if register success

      // so we make a validation in backend
      // we check if such user already exists

    } catch (err){
      dispatch({    
        type: REGISTER_FAIL,
        payload: err.response.data.msg    // msg --> error message from backend 
      })
    }
  }

  // Login user
  const login = async formData => {
    // it's a POST request, so we need a Content-type
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try{
      const res = await axios.post('/api/auth', formData, config);  
      
      dispatch({    
        type: LOGIN_SUCCESS,
        payload: res.data   
      });
      loadUser();   

    } catch (err){
      dispatch({    
        type: LOGIN_FAIL,
        payload: err.response.data.msg   
      })
    }
  }

  // Logout - destroy the token and clear everything up
  const logout = () => dispatch({ type: LOGOUT });

  // Clear errors 
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS })  // dispatch to reducer
 
  return (   // wrapping the app with this provider
    <AuthContext.Provider 
    value={{ 
      token: state.token,
      isAuthenticated: state.isAuthenticated,
      loading: state.loading,
      user: state.user,
      error: state.error,
      register,
      loadUser,
      login,
      logout,
      clearErrors

    }}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthState;