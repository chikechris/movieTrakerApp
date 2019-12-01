import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/authContext/authContext'
import MovieForm from '../movies/MovieForm'
import MovieCounter from '../movies/MovieCounter'
import MovieFilter from '../movies/MovieFilter'
import MovieSearch from '../movies/MovieSearch'
import Movies from '../movies/Movies'

const Home = () => {
  const { getUser } = useContext(AuthContext)
  useEffect(() => {
    getUser()
    // eslint-disable-next-line 
  }, [])
  return (
    <div className='app-container'>
      <div className='main'>
        <div className='filter'>
          <MovieFilter />
          <MovieSearch />
        </div>
        <MovieForm />
        <MovieCounter />
      </div>
      <Movies />
    </div>
  )
}

export default Home
