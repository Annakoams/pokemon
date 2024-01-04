import React, { FunctionComponent } from 'react';
import PokemonList from './pages/pokemon-list';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PokemonsDetail from './pages/pokemon-detail';
import PageNotFound from './pages/no-pages';
import PokemonEdith from './pages/pokemon-edith';
import NewPokemon from './pages/pokemon-create';


const App: FunctionComponent = () => {
    return (
        <Router>
            <div>
                {/* La barre de toutes les pages de Pokemon */}
                <nav>
                    <div className='naw-wrapper teal'>
                        <Link to="/" className='brand-logo center'>Pokedex</Link>
                    </div>
                </nav>
                {/* Le système de gestion des routes de notre application */}
                <Routes>
                    <Route path="/" element={<PokemonList />} />
                    <Route path="/pokemons" element={<PokemonList />} />
                    <Route path="/pokemons/:id" element={<PokemonsDetail />} />
                    <Route path="/pokemons/edith/:id" element={<PokemonEdith />} />
                    
                </Routes>
            </div>
        </Router>
    );
}

export default App;
