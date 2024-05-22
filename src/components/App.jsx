import { Route, Routes } from 'react-router-dom';
import Home from './ContentSite/Pages/Home';
import Movies from './ContentSite/Pages/Movies';

export const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
   
  );
};