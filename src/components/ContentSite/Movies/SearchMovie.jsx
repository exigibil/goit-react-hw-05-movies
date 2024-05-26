import styles from './SearchMovie.module.css';
import { Link } from 'react-router-dom';
import { API_KEY, baseURL } from '../../API/apikey';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function SearchMovie({ query, onSelectMovie  }) {
  const apiKey = API_KEY;
  const URL = baseURL;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (query) {
      fetch(
        `${URL}/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=${currentPage}`
      )
        .then(response => response.json())
        .then(data => setMovies(data.results))
        .catch(error => console.error('Error fetching movies:', error))
        .finally(() => setLoading(false));
    } else {
      setMovies([]);
    }
  }, [query, currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  }
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleMovieClick = (movieId) => {
    onSelectMovie(movieId); 
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        <div className={styles.containerTrading}>
          <ul className={styles.trending}>
            {movies.map(movie => (
              <li key={movie.id} className={styles.trendingItem}>
                <Link to={`/movies/${movie.id}`} onClick={() => handleMovieClick(movie.id)}> {/* Use onClick to handle movie click */}
                  <div>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </div>
                  <div>{movie.title}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.containerBtn}>
          <button className={styles.buttonPrev} onClick={handlePrevPage} disabled={currentPage === 1}> Prev </button>
          <span>{currentPage}</span>
          <button className={styles.buttonNext} onClick={handleNextPage}> Next </button>
        </div>
      </>
      )}
    </div>
  );
}

SearchMovie.propTypes = {
  query: PropTypes.string.isRequired,
  onSelectMovie: PropTypes.func.isRequired,
};

export default SearchMovie;
