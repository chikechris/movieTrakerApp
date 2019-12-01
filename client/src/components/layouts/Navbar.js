import React from 'react'

import { MdTheaters} from 'react-icons/md'

const Navbar = () => {

  return (
    <div className="navbar">
      <div className="logo">
        <h1><MdTheaters />
          Movie-List-APP
        </h1>
       
      </div>
      <ul>
        <li>Hi, Christian</li>
        <span className="sm-hide">|</span>
        <li>
          <a href="#!">
            <span className="sm-hide">Logout</span>
            <i className="fas fa-sign-out-alt"></i>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
