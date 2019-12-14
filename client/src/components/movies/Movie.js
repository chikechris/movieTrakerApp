import React, { useContext } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import MovieContext from '../../context/movieContext/movieContext';

const Movie = ({ movie }) => {
  const { deleteMovie, updateMovie, editMovie, clearEdit } = useContext(
    MovieContext
  );
  const { _id, movie_name, main_actor, movie_type, year, watched } = movie;

  const handleDelete = () => {
    deleteMovie(_id);
    clearEdit();
  };

  const handleWatched = () => {
    updateMovie({ ...movie, watched: !watched });
  };
  return (
    <div className='movie-card'>
      <div className='card-head'>
        <div>
          <label className={`${watched && 'confirm'}`}>
            Watched
            <i className={`fas fa-check-square ${watched && 'confirm'}`}>
              <input type='checkbox' onChange={handleWatched} />
            </i>
          </label>
        </div>
        <div>
          <button onClick={() => editMovie(movie)}>
            <MdEdit />
          </button>
          <button onClick={handleDelete}>
            <MdDelete />
          </button>
        </div>
      </div>
      <div className='card-body'>
        <span
          className={
            'badge ' +
            (movie_type === 'Action'
              ? 'red'
              : movie_type === 'Drama'
              ? 'blue'
              : movie_type === 'Horror'
              ? 'black'
              : movie_type === 'Comedy'
              ? 'brown'
              : 'pink')
          }
        >
          {movie_type}
        </span>
        <h3>{movie_name}</h3>
        <h4>{main_actor}</h4>
        <h4>{year}</h4>
      </div>
    </div>
  );
};

export default Movie;
