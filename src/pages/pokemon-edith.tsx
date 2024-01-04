import React, { FunctionComponent, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PokemonForm from '../components/pokemon-form';
import Pokemon from '../models/pokemon';
import POKEMONS from '../models/mock-pokemon';
import PokemonService from '../services/pokemon-service';

const PokemonEdit: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const fetchedPokemon = await PokemonService.getPokemon(id);
        setPokemon(fetchedPokemon);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    };
  
    if (id) {
      setIsEditing(true);
      fetchPokemon();
    }
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div>
      {pokemon ? (
        <div className="row">
          <h2 className="header center">Éditer {pokemon.name}</h2>
          <PokemonForm pokemon={pokemon} isEditForm={true}></PokemonForm>
          <Link to="/">Retour</Link>
        </div>
      ) : (
        <h4 className="center">Aucun pokémon à afficher !</h4>
      )}
    </div>
  );
};

export default PokemonEdit;
