import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Recommendations } from './pages/Recommendations';
import { Recipes } from './pages/Recipes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
