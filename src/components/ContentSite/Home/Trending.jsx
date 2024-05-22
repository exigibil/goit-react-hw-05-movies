import styles from "./Trending.module.css"
import { API_KEY, baseURL } from '../../API/apikey';
import { useEffect, useState  } from "react";
import { Link } from 'react-router-dom';

function GetTrading() {
    const apiKey = API_KEY
    const URL = baseURL
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const response = await fetch(`${URL}/trending/all/day?api_key=${apiKey}&language=en-US&page=1`);

                if (!response.ok) {
                    throw new Error(`Network response was not ok (${response.status})`);
                }
                const data = await response.json();
                setMovies(data.results)
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);

            }
        }
        fetchTrending();
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error}</div>
    }

    
    return (
        <div className={styles.containerTrading}>
            <h1 className={styles.title}>Trending Movies Today</h1>
            <ul className={styles.trending}>
               {movies.map(movie => (
                <li key={movie.id} className={styles.trendingItem}> 
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                <Link to="/">{movie.title}</Link>
                </li>
                
               ))}
            </ul>
        </div> 
    )


}

export default GetTrading;