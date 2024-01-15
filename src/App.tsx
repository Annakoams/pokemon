import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PokemonsList from '../src/pages/pokemon-list';
import PokemonsDetail from '../src/pages/pokemon-detail';
import PageNotFound from '../src/pages/no-pages';
import PokemonEdit from '../src/pages/pokemon-edith';
import PokemonAdd from '../src/pages/pokemon-create';
import Login from '../src/pages/login';
import PrivateRoute from '../src/PrivateRoute';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <div className="nav-wrapper teal">
            <Link to="/" className="brand-logo center">
              Pokédex
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="pokemons/*" element={<PrivateRoute />}>
            
            <Route index element={<PokemonsList />} />
            <Route path="add" element={<PokemonAdd />} />
            <Route path="edit/:id" element={<PokemonEdit />} />
            <Route path=":id" element={<PokemonsDetail />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
