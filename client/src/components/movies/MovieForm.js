import React, { useState, useContext, useEffect } from 'react';
import MovieContext from '../../context/movieContext/movieContext';

const MovieForm = () => {
  const { addMovie, edit, updateMovie, clearEdit } = useContext(MovieContext);
  useEffect(() => {
    if (edit !== null) {
      setMovie(edit);
    } else {
      setMovie({
        movie_name: '',
        main_actor: '',
        year: '',
        movie_type: 'Action',
      });
    }
  }, [edit]);

  const [movie, setMovie] = useState({
    movie_name: '',
    main_actor: '',
    year: '',
    movie_type: 'Action',
  });

  const { movie_name, main_actor, year, movie_type } = movie;

  const onChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = e => {
    e.preventDefault();
    if (edit !== null) {
      updateMovie(movie);
      clearEdit();
    } else {
      addMovie(movie);
      setMovie({
        movie_name: '',
        main_actor: '',
        year: '',
        movie_type: 'Action',
      });
    }
  };

  return (
    <div className='invite-section'>
      <h1>{edit !== null ? 'Edit Movie' : 'Add Movie Here'}</h1>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Movie Name'
          name='movie_name'
          value={movie_name}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='Main Actor'
          name='main_actor'
          value={main_actor}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='Year'
          name='year'
          value={year}
          onChange={onChange}
        />
        <p className='options-label'>Movie Type</p>
        <div className='options'>
          <label className='container'>
            Action
            <input
              type='radio'
              name='movie_type'
              value='Action'
              checked={movie_type === 'Action'}
              onChange={onChange}
            />
            <span className='checkmark' />
          </label>

          <label className='container'>
            Comedy
            <input
              type='radio'
              name='movie_type'
              value='Comedy'
              checked={movie_type === 'Comedy'}
              onChange={onChange}
            />
            <span className='checkmark' />
          </label>
          <label className='container'>
            Drama
            <input
              type='radio'
              name='movie_type'
              value='Drama'
              checked={movie_type === 'Drama'}
              onChange={onChange}
            />
            <span className='checkmark' />
          </label>
          <label className='container'>
            Horror
            <input
              type='radio'
              name='movie_type'
              value='Horror'
              checked={movie_type === 'Horror'}
              onChange={onChange}
            />
            <span className='checkmark' />
          </label>
          <label className='container'>
            Other
            <input
              type='radio'
              name='movie_type'
              value='Other'
              checked={movie_type === 'Other'}
              onChange={onChange}
            />
            <span className='checkmark' />
          </label>
        </div>
        <input
          type='submit'
          value={edit !== null ? 'Update Movie' : 'Submit Movie'}
          className='btn'
        />
        {edit !== null ? <input onClick={clearEdit} value='Cancel' type='button' className='btn clear' /> : null}
      </form>
    </div>
  );
};

export default MovieForm;