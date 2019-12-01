import axios from 'axios';

const setToken = token => {
  if (token) {
    axios.defaults.headers.common['a-token'] = token;
  } else {
    delete axios.defaults.headers.common['a-token'];
  }
};

export default setToken;