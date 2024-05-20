import { API_KEY, baseURL } from "./apikey";



export async function trendingMovies() {
    const apiKey = API_KEY
    const URL = baseURL
    try {
        const respons = await fetch(`${URL}/movie/popular?api_key=${apiKey}&page=1`)
        return respons.json;
    }
    catch (error) {
        console.log(error)
    }
   
}

console.log(trendingMovies())