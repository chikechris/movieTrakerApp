import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import setToken from '../../utils/setToken';
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  // SET_ERROR,
  CLEAR_ERROR,
  LOGOUT,
  SET_USER,
  AUTH_ERROR
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    userAuth: null,
    errors: null
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  // getUser
  const getUser = async () => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    try {
      const res = await axios.get('/auth');
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
        // payload: err
      });
    }
  };

  //Register User
  const registerUser = async userData => {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/register', userData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      getUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.error
      });
    }
  };

  //Login User
  const loginUser = async userData => {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/auth', userData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      getUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  const setError = err => {
    dispatch({
      type: REGISTER_FAIL,
      payload: [{ msg: err }]
    });
  };
  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR
    });
  };

  // Login Out user
  const logout = () => dispatch({ type: LOGOUT });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        userAuth: state.userAuth,
        errors: state.errors,
        getUser,
        registerUser,
        loginUser,
        setError,
        clearError,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
