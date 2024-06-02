import React, { useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import styles from "./SearchBar.module.css";
import PropTypes from "prop-types";

function SearchBar({ onSearch }) {
  const [searchItem, setSearchItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchItem);
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.appName}>AEM Search Movies</div>
      <div className={styles.searchBarContainer}>
        <form className={styles.searchBarForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles.button}>
            <SlMagnifier className={styles.searchIcon} />
          </button>
          <input
            type="text"
            className={styles.searchBarInput}
            placeholder="Search for movies..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            aria-label="Search movies"
          />
        </form>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
