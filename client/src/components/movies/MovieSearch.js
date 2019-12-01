import React, { useContext, useRef } from 'react'
import MovieContext from '../../context/movieContext/movieContext'

const MovieSearch = () => {
  const { searchMovie, clearSearch } = useContext(MovieContext)
  const searchValue = useRef('')
  const onChange = e => {
    if (searchValue.current.value !== '') {
      searchMovie(e.target.value)

    } else {
      clearSearch()
    }
  }
  return (
    <div className='search1'>
      <input
        ref={searchValue}
        type='text'
        className='search'
        placeholder=' Search Movies by name ...'
        onChange={onChange}
      />
      <i className='fas fa-search search-icon' />
    </div>
  )
}

export default MovieSearch
