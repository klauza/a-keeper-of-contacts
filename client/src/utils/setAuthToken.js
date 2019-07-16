// check if token is passed

// if yes, set it to global header

// if not, delete it from global header
import axios from 'axios';
const setAuthToken = token =>{
  if(token){
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
}

export default setAuthToken;