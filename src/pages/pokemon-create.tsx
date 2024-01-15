import React, { FunctionComponent, useState } from 'react';
import PokemonForm from '../components/pokemon-form';
import Pokemon from '../models/pokemon';

const PokemonAdd: FunctionComponent = () => {
    const [created] = useState<Date>(new Date());
    const [id] = useState<number>(new Date().getTime());
    const [pokemon] = useState<Pokemon>(new Pokemon(id, 100, 10, '...', 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/XXX.png', ['Normal'], created));
   
   
   
   
    return (
        <div className='row'>
            <h2 className='header center'></h2>
            <PokemonForm pokemon={pokemon} isEditForm={false} created={created}></PokemonForm>
        </div>
    );
};

export default PokemonAdd;
