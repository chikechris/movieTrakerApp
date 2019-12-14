import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/authContext/authContext'

const Register = (props) => {
  const { registerUser, userAuth, errors, setError, clearError } = useContext(
    AuthContext
  )

  useEffect(() => {
    if (userAuth) {
      props.history.push('/')
    }
  }, [userAuth, props.history])
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordB: ''
  })

  const { name, email, password, passwordB } = user

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
    if (errors !== null) {
      clearError()
    }
  }

  const submit = e => {
    e.preventDefault()
    if (password !== passwordB) {
      setError({ msg: 'Incorrect password' })
    } else {
      registerUser({ name, email, password })
     
    }
  }
  return (
    <div className='register'>
      <h1>Sign Up</h1>
      <form onSubmit={submit}>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={name}
          onChange={handleChange}
        />
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
        // minLength='6'
        />
        <input
          type='password'
          name='passwordB'
          placeholder='Re-Enter Password'
          value={passwordB}
          onChange={handleChange}
        // minLength='6'
        />
        <input type='submit' value='Sign Up' className='btn' />
      </form>
      <div className='question'>
        {errors !== null && <button className='danger'>
          {errors.msg ? errors.msg : errors.error[0].msg}
          <span onClick={() => clearError()}>X</span>
        </button>
        }
        {/* {errors !== null && errors.map(err => <button className="danger" type="button">{err.message}<span onClick={()=> clearError()}>X</span> </button>)} */}
        <p>
          Already Have an account? {''} <Link to='/login'>Login</Link>{' '}
        </p>
      </div>
    </div>
  )
}

export default Register
