import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import Home from './components/pages/Home'
import MovieState from './context/movieContext/MovieState'
import AuthState from './context/authContext/AuthState'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import PrivateRoute from './components/pages/routes/PrivateRoute'
import setToken from './utils/setToken'
import './App.css'

if (localStorage.token) {
  setToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
      <MovieState>
        <Router>
          <div>
            <Navbar />
            <Switch>
              <PrivateRoute exact path='/' component={Home} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </div>
        </Router>
      </MovieState>
    </AuthState>

  )
}

export default App
