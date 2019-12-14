import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  CLEAR_ERROR,
  LOGOUT,
  SET_USER,
  AUTH_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        userAuth: true,
        errors: null
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        userAuth: true,
        errors: null,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT:
    case AUTH_ERROR:
      localStorage.removeItem('token')

      return {
        ...state,
        token: null,
        userAuth: null,
        user: null,
        errors: action.payload
      }
   
    case CLEAR_ERROR:
      return {
        ...state,
        errors: null
      }
    default:
      return state;
  }
};
