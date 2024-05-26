import { API_KEY, baseURL } from '../../API/apikey';
import { useEffect, useState } from 'react';

function MovieDetails(props) {
  const { movie_id } = props;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = API_KEY;
  const URL = baseURL;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${URL}/movie/${movie_id}?api_key=${apiKey}&language=en-US`
        );
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movie_id, URL, apiKey]);

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
      <div>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <p>{movie.genres}</p>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div>
        <p>Additional Information</p>
        <p>{movie.cast}</p>
        <p>{movie.reviews}</p>
      </div>
    </>
  );
}

export default MovieDetails;
