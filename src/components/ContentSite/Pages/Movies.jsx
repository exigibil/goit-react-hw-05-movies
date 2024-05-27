import React, { useState, Suspense } from 'react';
import Navbar from '../Navbar/Navbar';
import SearchBar from '../SearchBar/SearchBar';

const SearchMovie = React.lazy(() => import('../Movies/SearchMovie'));

function Movies() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Navbar />
      <div>
        <SearchBar onSearch={handleSearch} />
        <Suspense fallback={<p>Loading...</p>}>
          {searchQuery && (
            <SearchMovie query={searchQuery} />
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default Movies;
