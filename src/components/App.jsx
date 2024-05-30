import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './ContentSite/Pages/Home';
import Movies from './ContentSite/Pages/Movies';
import MovieDetails from './ContentSite/Pages/DetailsMovie';
import Cast from './ContentSite/Pages/Cast';
import Reviews from './ContentSite/Pages/Reviews';

export const App = () => {
  return (
    <Router basename="/goit-react-hw-05-movies">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="/movies/:movieId/cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} /> 
        </Route>
      </Routes>
    </Router>
  );
};
