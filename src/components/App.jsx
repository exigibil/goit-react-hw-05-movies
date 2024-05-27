import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './ContentSite/Pages/Home';
import Movies from './ContentSite/Pages/Movies';
import MoviesDetails from './ContentSite/Pages/DetailsMovie';

export const App = () => {
  return (
    
    <Router basename="/goit-react-hw-05-movies">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MoviesDetails />} />
      </Routes>
  </Router>
    
  );
};