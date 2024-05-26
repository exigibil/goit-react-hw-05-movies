import React, { useState, Suspense } from 'react';
import Navbar from '../Navbar/Navbar';
import SearchBar from '../SearchBar/SearchBar';
import SearchMovie from "../Movies/SearchMovie";
import MovieDetails from "../MovieDetails/MovieDetails";

function Movies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleMovieSelect = (movieId) => {
    setSelectedMovieId(movieId);
  };

  return (
    <div>
      <Navbar />
      <div>
        <SearchBar onSearch={handleSearch} />
        <Suspense fallback={<p>Loading...</p>}>
          {searchQuery && !selectedMovieId && (
            <SearchMovie query={searchQuery} onSelectMovie={handleMovieSelect} />
          )}
          {selectedMovieId && <MovieDetails movie_id={selectedMovieId} />} 
        </Suspense>
      </div>
    </div>
  );
}

export default Movies;
