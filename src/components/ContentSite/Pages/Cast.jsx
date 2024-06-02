import React, { useEffect, useState } from 'react';
import styles from '../MovieDetails/MovieDetails.module.css';
import { API_KEY, baseURL } from '../../API/apikey';

function CastMovie({ movieId }) {
  const [cast, setCast] = useState([]);
  const apiKey = API_KEY;
  const URL = baseURL;

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(
          `${URL}/movie/${movieId}/credits?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        console.error('Error fetching cast:', error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <>
      {cast && (
        <div className={styles.castContainer}>
          <h2>Cast</h2>
          <ul className={styles.castlistContainer}>
            {cast.map(actor => (
              <li className={styles.castList} key={actor.id}>
                <div>{actor.name}</div>
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                    alt={actor.name}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default CastMovie;
