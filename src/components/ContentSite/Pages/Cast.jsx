function Cast({ cast }) {
    console.log("Cast component received cast data:", cast);
  
    return (
      <>
        {cast && (
          <div>
            <h2>Cast</h2>
            <ul>
              {cast.map(actor => (
                <li key={actor.id}>{actor.name}
                <img
                src={`https://image.tmdb.org/t/p/w500/${actor.poster_path}`}
                alt={actor.name}
              />
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  }
  
  export default Cast;