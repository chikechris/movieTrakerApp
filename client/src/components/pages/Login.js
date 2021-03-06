import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext';

const Login = props => {
  const { loginUser, userAuth, errors, clearError } = useContext(AuthContext);
  useEffect(() => {
    if (userAuth) {
      props.history.push('/');
      clearError();
    }
    // eslint-disable-next-line
  }, [userAuth, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (errors !== null) {
      clearError();
    }
  };

  const submit = e => {
    e.preventDefault();
    loginUser({ email, password });
    clearError();
  };

  return (
    <div className='login'>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={email}
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={handleChange}
        />

        <input type='submit' value='Login' className='btn' />
      </form>
      <div className='question'>
        {errors !== null && (
          <button className='danger' type='button'>
            {errors}
            {/* {errors.msg ? errors.msg : errors.error[0].msg} */}

            <span onClick={() => clearError()}>X</span>
          </button>
        )}
        <p>
          Dont have an account? {''} <Link to='/register'>Sign Up</Link>{' '}
        </p>
      </div>
    </div>
  );
};

export default Login;
