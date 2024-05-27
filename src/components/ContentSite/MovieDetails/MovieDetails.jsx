import React, { useEffect, useState } from 'react';
import { API_KEY, baseURL } from '../../API/apikey';
import { useParams } from'react-router-dom';

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
  
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
     
    
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
    </>
  );
}

export default MovieDetails;
