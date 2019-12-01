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
  MOVIES_ERROR
} from '../types';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: payload
      }
    case ADD_MOVIE:
      return {
        ...state,
        movies: [...state.movies, payload],
      };

    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter(movie => movie._id !== payload)
      };

    case UPDATE_MOVIE:
      return {
        ...state,
        movies: state.movies.map(movie =>
          movie._id === payload._id ? payload : movie
        ),
      };

    case EDIT_MOVIE:
      return {
        ...state,
        edit: payload
      }
    case CLEAR_EDIT:
      return {
        ...state,
        edit: null
      }

    case SEARCH_MOVIE:
      return {
        ...state,
        search: state.movies.filter(movie => {
          const regex = new RegExp(`${payload}`, 'gi');
          return movie.name.match(regex);
        }),
      };
    case MOVIES_ERROR:
      return {
        ...state,
        movies: [],
        errors: payload
      }
    case CLEAR_SEARCH:
      return {
        ...state,
        search: null,
      };
    case TOGGLE_FILTER:
      return {
        ...state,
        filterMovie: !state.filterMovie,
      };
    default:
      return state;
  }
};
