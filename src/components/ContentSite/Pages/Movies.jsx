import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import SearchBar from '../SearchBar/SearchBar';
import SearchMovie from '../Movies/SearchMovie';
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from '../BackButton/BackButton'; 

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userSearch = params.get('UserSearch');
    if (userSearch) {
      setSearchQuery(userSearch);
    }
  }, [location.search]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    navigate(`/movies?UserSearch=${query.toLowerCase()}`);
  };

  return (
    <div>
      <Navbar />
      <div>
        <SearchBar onSearch={handleSearch} />
        {searchQuery && (
          <SearchMovie query={searchQuery} />
        )}
      </div>
    </div>
  );
};

export default Movies;
