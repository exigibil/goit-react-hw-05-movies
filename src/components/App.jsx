import { Route, Routes } from 'react-router-dom';
import Home from './ContentSite/Pages/Home';
import Movies from './ContentSite/Pages/Movies';
import MovieDetails from './ContentSite/MovieDetails/MovieDetails';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path=":movieId" element={<MovieDetails />} />
    </Routes>
  );
};
