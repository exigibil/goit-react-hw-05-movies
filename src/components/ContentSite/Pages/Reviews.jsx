import React, { useEffect, useState } from 'react';
import { API_KEY, baseURL } from '../../API/apikey';
import PropTypes from 'prop-types';

function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const apiKey = API_KEY;
      const URL = baseURL;

      try {
        const response = await fetch(
          `${URL}/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US&page=1`
        );
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
        const data = await response.json();

        setReviews(data.results);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (reviews.length === 0) {
    return <p>No reviews available</p>;
  }

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p><b>Author: {review.author}</b></p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

Reviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default Reviews;
