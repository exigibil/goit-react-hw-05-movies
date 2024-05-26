import React, { useState } from 'react';
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
        <React.Suspense fallback={<p>Loading...</p>}>
          {searchQuery && <SearchMovie query={searchQuery} />}
        </React.Suspense>
      </div>
    </div>
  );
}

export default Movies;
