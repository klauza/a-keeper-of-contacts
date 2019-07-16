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

export default (state, action) => {
  switch(action.type){
    case USER_LOADED:
      return{
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload 
      } 
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // GET TOKEN, put token that we get back from database into localstorage, put everything into the state nad log-in
      localStorage.setItem('token', action.payload.token);

      return{
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      }

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem('token');

      return{   // basically we reset everything
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload   // it receives data error from AuthState [ payload: err.response.data.msg ]  
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
      
    default:
      return state
  }
}