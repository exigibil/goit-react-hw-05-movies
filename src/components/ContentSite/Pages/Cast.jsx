import styles from "../MovieDetails/MovieDetails.module.css"


function Cast({ cast }) {
    console.log("Cast component received cast data:", cast);
  
    return (
      <>
        {cast && (
          <div className={styles.castContainer}>
            <h2>Cast</h2>
            <ul className={styles.castlistContainer} >
              {cast.map(actor => (
                <li className={styles.castList}  key={actor.id}>
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
  
  export default Cast;