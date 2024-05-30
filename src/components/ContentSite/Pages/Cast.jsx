function Cast({ cast }) {
    console.log("Cast component received cast data:", cast);
  
    return (
      <>
        {cast && (
          <div>
            <h2>Cast</h2>
            <ul>
              {cast.map(actor => (
                <li key={actor.id}>{actor.name}</li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  }
  
  export default Cast;