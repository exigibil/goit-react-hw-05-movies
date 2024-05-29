import React, { useEffect, useState } from 'react';
import { API_KEY, baseURL } from '../../API/apikey';
import { useParams } from 'react-router-dom';
import styles from './MovieDetails.module.css';
import { TiArrowBackOutline } from 'react-icons/ti';

function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

        setMovie({ ...data, cast });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId, URL, apiKey]);

  const fetchCast = async movieId => {
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
          <button className={styles.buttonBack}>
            <TiArrowBackOutline /> Back
          </button>
        </div>
        <div  className={styles.topImgContainer}>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
          </div>

          <div className={styles.textContainer} >
            <h1>{movie.title} <span> ({movie.release_date.split('-')[0]})</span> </h1>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <p>
              {' '}
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
            <a href="#">Cast</a>
          </li>
          <li>
            <a href="#">Review</a>
          </li>
        </ul>

        <div className={styles.horizontalBar}></div>
        {movie.cast && (
          <div>
            <h2>Cast</h2>
            <ul>
              {movie.cast.map(actor => (
                <li key={actor.id}>{actor.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default MovieDetails;
