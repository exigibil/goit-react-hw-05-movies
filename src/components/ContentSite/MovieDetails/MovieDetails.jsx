import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import CastMovie from '../Pages/Cast';
import Reviews from '../Pages/Reviews';
import styles from './MovieDetails.module.css';
import { API_KEY, baseURL } from '../../API/apikey';
import BackButton from '../BackButton/BackButton';

function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCast, setShowCast] = useState(false); 
  const [showReviews, setShowReviews] = useState(false);
  const location = useLocation();
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
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId, URL, apiKey]);

 

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
          <BackButton />
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
            <p>
              User Score: <b>{movie.vote_average.toFixed(1)}</b> / Votes:{' '}
              {movie.vote_count}
            </p>
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

      
        {showCast && <CastMovie key={movieId} movieId={movieId} />}
        {showReviews && <Reviews movieId={movieId} />}
      </div>
    </>
  );
}

export default MovieDetails;
