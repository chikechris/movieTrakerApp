import React, { useReducer, useState } from 'react'
import MovieContext from './movieContext'
import movieReducer from './movieReducer'
import axios from 'axios'
import {
  TOGGLE_FILTER,
  SEARCH_MOVIE,
  CLEAR_SEARCH,
  ADD_MOVIE,
  DELETE_MOVIE,
  EDIT_MOVIE,
  CLEAR_EDIT,
  UPDATE_MOVIE,
  GET_MOVIES,
  MOVIES_ERROR,
  CLEAR_MOVIES
} from '../types'

const MovieState = props => {
  const initialState = {
    movies: [],
    filterMovie: false,
    search: null,
    edit: null,
    errors: null
  }

  const [state, dispatch] = useReducer(movieReducer, initialState)

  // getMovies
  const getMovies = async () => {
    try {
      const res = await axios.get('/movies')
      dispatch({
        type: GET_MOVIES,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: MOVIES_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Add movie
  const addMovie = async movie => {
    const config = {
      'Content-Type': 'application/json'
    }
    try {
      const res = await axios.post('/movies', movie, config)
      dispatch({
        type: ADD_MOVIE,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: MOVIES_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Delete Movie
  const deleteMovie = async id => {
    try {
      await axios.delete(`/movies/${id}`)
      dispatch({
        type: DELETE_MOVIE,
        payload: id
      })
    } catch (err) {
      dispatch({
        type: MOVIES_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Edit movie
  const editMovie = movie => {
    dispatch({
      type: EDIT_MOVIE,
      payload: movie
    })
  }

  // Clear edit
  const clearEdit = () => {
    dispatch({
      type: CLEAR_EDIT
    })
  }

  // Update movie
  const updateMovie = async movie => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.put(`/movies/${movie._id}`, movie, config)
      dispatch({
        type: UPDATE_MOVIE,
        payload: res.data
      })
      getMovies()
    } catch (err) {
      dispatch({
        type: MOVIES_ERROR,
        payload: err.response
      })
    }
  }

  const toggleFilter = () => {
    dispatch({
      type: TOGGLE_FILTER
    })
  }

  const searchMovie = movie => {
    dispatch({
      type: SEARCH_MOVIE,
      payload: movie
    })
  }

  const clearSearch = () => {
    dispatch({
      type: CLEAR_SEARCH
    })
  }

  const clearMovies =() => {
    dispatch({
      type: CLEAR_MOVIES
    })
  }

  return (
    <MovieContext.Provider
      value={{
        movies: state.movies,
        filterMovie: state.filterMovie,
        search: state.search,
        errors:state.errors,
        edit: state.edit,
        addMovie,
        getMovies,
        deleteMovie,
        updateMovie,
        editMovie,
        clearEdit,
        toggleFilter,
        searchMovie,
        clearSearch,
        clearMovies
      }}
    >
      {props.children}
    </MovieContext.Provider>
  )
}

export default MovieState
