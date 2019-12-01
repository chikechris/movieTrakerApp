import React, { useContext, useEffect } from 'react'
import MovieContext from '../../context/movieContext/movieContext'
import Movie from './Movie'

const Movies = () => {
  const { movies, filterMovie, search, getMovies } = useContext(MovieContext)

  useEffect(() => {
    getMovies()
    // eslint-disable-next-line 
  }, [])
  return (
    <div className="movies">
      {
        search !== null ? search.map(movie => <Movie key={movie.id} movie={movie} />) :
          movies.filter(movie => !filterMovie || movie.watched).map(movie => <Movie key={movie.id} movie={movie} />)
      }
    </div>
  )

}

export default Movies