import React, { useContext } from 'react'
import MovieContext from '../../context/movieContext/movieContext'


const MovieFilter = () => {

  const { toggleFilter } = useContext(MovieContext)
  return (
    <div className="toggle">
      <label className="switch">
        <input type="checkbox" onChange={() => toggleFilter()} />
        <span className="slider round"></span>
      </label>
      <p className="lead">Display Watched Movie</p>
    </div>
  )
}

export default MovieFilter