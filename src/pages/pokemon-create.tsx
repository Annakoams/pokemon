import React, { FunctionComponent, useState } from 'react';
import PokemonForm from '../components/pokemon-form';
import Pokemon from '../models/pokemon';
import formatType from '../helpers/format-type';
import { useNavigate } from 'react-router-dom';
import PokemonService from '../services/pokemon-service';






const PokemonAdd: FunctionComponent = () => {
   const [id] = useState<number>(new Date().getTime());
   const [pokemon] = useState<Pokemon>(new Pokemon(id));

   


    


    return (
        <div className='row'>
            <h2 className='header center'></h2>
            <PokemonForm pokemon={pokemon}></PokemonForm>
        </div>
    );
};

export default PokemonAdd;