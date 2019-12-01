import React, { useContext } from 'react';
import MovieContext from '../../context/movieContext/movieContext';

const MovieCounter = () => {
  const { movies } = useContext(MovieContext);
  const sumOfMovies = movies.length;
  const yetToWatch = movies.filter(movie => !movie.watched);
  const sumOfYetToWatch = yetToWatch.length;
  const moviesAddedByType = mvType =>
    movies.filter(movie => movie.movie_type === mvType).length;
  const moviesYetToWatch = mvType =>
    yetToWatch.filter(movie => movie.movie_type === mvType).length;

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Movie</th>
            <th>Movies Added</th>
            <th>Yet To Watch</th>
          </tr>
          <tr>
            <th>Action</th>
            <td>{moviesAddedByType('Action')}</td>
            <td>{moviesYetToWatch('Action')}</td>
          </tr>
          <tr>
            <th>Comedy</th>
            <td>{moviesAddedByType('Comedy')}</td>
            <td>{moviesYetToWatch('Comedy')}</td>
          </tr>
          <tr>
            <th>Drama</th>
            <td>{moviesAddedByType('Drama')}</td>
            <td>{moviesYetToWatch('Drama')}</td>
          </tr>
          <tr>
            <th>Horror</th>
            <td>{moviesAddedByType('Horror')}</td>
            <td>{moviesYetToWatch('Horror')}</td>
          </tr>
          <tr>
            <th>Other</th>
            <td>{moviesAddedByType('Other')}</td>
            <td>{moviesYetToWatch('Other')}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{sumOfMovies}</td>
            <td>{sumOfYetToWatch}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MovieCounter;