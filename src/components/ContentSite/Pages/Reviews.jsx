function Reviews({ reviews }) {
    if (!reviews || reviews.length === 0) {
      return <p>No reviews available</p>;
    }
  
    return (
      <>
        <h2>Reviews</h2>
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      </>
    );
  }
  
  export default Reviews;
  