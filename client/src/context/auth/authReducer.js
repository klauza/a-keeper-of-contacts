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
    case REGISTER_SUCCESS:
      // put token that we get back from database int olocalstorage
      localStorage.setItem('token', action.payload.token);

      return{
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      }

    case REGISTER_FAIL:
      localStorage.removeItem('token');

      return{   // basically we reset everything
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload   // it receives data error from AuthState [ payload: err.response.data.msg ]  
      }
    default:
      return state
  }
}