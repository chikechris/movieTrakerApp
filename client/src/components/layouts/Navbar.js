import React, { useContext, Fragment } from 'react'
import AuthContext from '../../context/authContext/authContext'
import { Link } from 'react-router-dom'
import { MdTheaters, MdSend } from 'react-icons/md'

const Navbar = () => {
  const { logout, clearError, userAuth, user } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
    clearError()
  }

  const userLinks = (
    <Fragment>
      <li>Welcome, {user && user.name}</li>
      <span className="sm-hide">|</span>
      <li>
        <a href="#!" onClick={handleLogout}>
          <span className="sm-hide">Logout{' '}</span>
          <MdSend />
        </a>
      </li>
    </Fragment>
  )

  const authLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Sign Up</Link>
      </li>
      <span className='sm-hide'>|</span>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  )
  return (
    <div className="navbar">
      <div className="logo">
        <h1><MdTheaters />
          Movie-List-APP
        </h1>

      </div>
      <ul>
        {userAuth ? userLinks : authLinks}
      </ul>
    </div>
  )
}

export default Navbar
