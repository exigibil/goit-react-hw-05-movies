import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import SearchBar from '../SearchBar/SearchBar';
import MovieDetails from "../MovieDetails/MovieDetails";

function MoviesDetails() {
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleSearch = (query, movieId) => {
    setSelectedMovieId(movieId); 
  };

  return (
    <div>
      <Navbar />
      <div>
        <SearchBar onSearch={(query, movieId) => handleSearch(query, movieId)} />
        <MovieDetails />
      </div>
    </div>
  );
}

export default MoviesDetails;
