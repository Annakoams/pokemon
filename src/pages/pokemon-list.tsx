import React, { FunctionComponent, useState, useEffect } from 'react';
import Pokemon from '../models/pokemon';
import PokemonCard from '../components/pokemon-card';
import PokemonService from '../services/pokemon-service';
import { useNavigate } from 'react-router-dom';

const PokemonList: FunctionComponent = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    PokemonService.getPokemons().then(pokemons => setPokemons(pokemons))
  }, []);

  const addPokemon = () => {
    navigate(``)
  }

  return (
    <div>
      <h1 className="center">Pokédex</h1>
      <div className="center ml-2" > ajouter Pokemon
        <span className='btn-floating  '>
          <i className='material-icons'>+</i>
        </span>
      </div>
      <div className="container">
        <div className="row">
          {pokemons.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}

        </div>

      </div>

    </div>

  );
}

export default PokemonList;