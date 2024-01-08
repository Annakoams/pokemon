import React, { FunctionComponent, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PokemonForm from '../components/pokemon-form';
import Pokemon from '../models/pokemon';
import PokemonService from '../services/pokemon-service';

const PokemonEdit: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  

  useEffect(() => {
    if (id) {
      PokemonService.getPokemon(+id).then((pokemon) => {
        // Assurez-vous que la propriété `created` est toujours définie
        if (pokemon && !pokemon.created) {
          pokemon.created = new Date();
          console.log("creationDate dans le pokemon-details:", pokemon.created);
        }
        setPokemon(pokemon);
      });
    }
  }, [id]);

  return (
    <div>
      {pokemon ? (
        <div className="row">
          <h2 className="header center">Éditer {pokemon.name}</h2>
          <PokemonForm pokemon={pokemon} isEditForm={true} created={pokemon.created || new Date()} ></PokemonForm>
          <Link to="/">Retour</Link>
        </div>
      ) : (
        <h4 className="center">Aucun pokémon à afficher !</h4>
      )}
    </div>
  );
};

export default PokemonEdit;
