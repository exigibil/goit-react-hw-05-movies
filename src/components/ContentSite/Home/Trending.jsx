// @ts-nocheck
import { Link } from 'react-router-dom';
import styles from "./Trending.module.css"
import { API_KEY, baseURL } from '../../API/apikey';
import { useEffect, useState  } from "react";


function GetTrading() {
    const apiKey = API_KEY
    const URL = baseURL
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const response = await fetch(`${URL}/trending/all/day?api_key=${apiKey}&language=en-US&page=${currentPage}`);

                if (!response.ok) {
                    throw new Error(`Network response was not ok (${response.status})`);
                }
                const data = await response.json();
                setMovies(data.results)
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            } finally {
                setLoading(false);

            }
        }
        fetchTrending();
    }, [URL, apiKey, currentPage]);

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error}</div>
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
      }
      const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
      };

    return (
        
        <>
        <div className={styles.containerTrading}>
            <h1 className={styles.title}>Trending Movies Today</h1>
            <ul className={styles.trending}>
               {movies.map(movie => (
                <li key={movie.id} className={styles.trendingItem}> 
                  <Link to={`/movies/${movie.id}`}> 
                   <div>
                   <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
                   </div>
                   <div>{movie.title}</div>
                   
                  </Link>
                </li>
                
               ))}
            </ul>
        </div> 
       <div className={styles.containerBtn}>
        <button className={styles.button} onClick={handlePrevPage} disabled={currentPage === 1}> Prev </button>
        <span>{currentPage}</span>
        <button className={styles.button} onClick={handleNextPage} > Next </button>
        </div>
        
        </>
    )


}

export default GetTrading;