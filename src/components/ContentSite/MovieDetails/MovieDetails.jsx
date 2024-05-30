import { useEffect, useState } from 'react';
import { API_KEY, baseURL } from '../../API/apikey';
import { useParams, Link } from 'react-router-dom';
import styles from './MovieDetails.module.css';
import { TiArrowBackOutline } from 'react-icons/ti';
import Cast from '../Pages/Cast';
import Reviews from '../Pages/Reviews';

function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState([]); // New state for reviews
  const apiKey = API_KEY;
  const URL = baseURL;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${URL}/movie/${movieId}?api_key=${apiKey}&language=en-US`
        );
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
        const data = await response.json();

        const cast = await fetchCast(movieId);
        const fetchedReviews = await fetchReviews(movieId); // Fetch reviews

        setMovie({ ...data, cast });
        setReviews(fetchedReviews); // Set reviews state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId, URL, apiKey]);

  const fetchCast = async (movieId) => {
    try {
      const response = await fetch(
        `${URL}/movie/${movieId}/credits?api_key=${apiKey}`
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      const data = await response.json();

      return data.cast;
    } catch (error) {
      throw new Error(`Error fetching cast: ${error.message}`);
    }
  };

  const fetchReviews = async (movieId) => { 
    try {
      const response = await fetch(
        `${URL}/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US&page=1`
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      const data = await response.json();

      return data.results;
    } catch (error) {
      throw new Error(`Error fetching reviews: ${error.message}`);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!movie) {
    return <p>No movie details available</p>;
  }

  return (
    <>
      <div className={styles.topContainer}>
        <div className={styles.buttonContainer}>
          <Link to="/movies">
            <button className={styles.buttonBack}>
              <TiArrowBackOutline /> Back
            </button>
          </Link>
        </div>
        <div className={styles.topImgContainer}>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
          </div>

          <div className={styles.textContainer}>
            <h1>
              {movie.title} <span> ({movie.release_date.split('-')[0]})</span>
            </h1>
            <p>User Score {movie.score}</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <p>
              {movie.genres.map((genre, index) => (
                <span key={index}>
                  {genre.name}
                  {index < movie.genres.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.lowContainer}>
        <div className={styles.horizontalBar}></div>
        <p>Additional Information</p>
        <ul>
        <li>
            <Link
              to={`/movies/${movieId}/cast`}
              onClick={() => {
                setShowCast(true);
                setShowReviews(false);
              }}
            >
              Cast
            </Link>
          </li>
          <li>
            <Link
              to={`/movies/${movieId}/reviews`}
              onClick={() => {
                setShowReviews(true);
                setShowCast(false); 
              }}
            >
              Reviews
            </Link>
          </li>
        </ul>

        <div className={styles.horizontalBar}></div>

        {showCast && <Cast cast={movie.cast} />}
        {showReviews && <Reviews reviews={reviews} />}
      </div>
    </>
  );
}

export default MovieDetails;
