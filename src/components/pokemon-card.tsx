
import React, { FunctionComponent , useState} from 'react';
import Pokemon from '../models/pokemon';
import './pokemon-card.css';
import formatDate from '../helpers/format-date';
import formatType from '../helpers/format-type';
import { useNavigate } from 'react-router-dom';
  
type Props = {
  pokemon: Pokemon,
  borderColor?: string
};
  
const PokemonCard: FunctionComponent<Props> = ({pokemon, borderColor = '#009688'}) => {
  const navigate = useNavigate();


    const [color, setColor]= useState<string>();

    const showBorder=()=>{
        setColor(borderColor);
    }
    const hideBorder=()=>{
        setColor('#f5f5f5');
    }

    const goToPokemonDetail = () => {
      // Utilisez navigate pour rediriger vers la page du détail du Pokémon
      navigate(`/pokemons/${pokemon.id}`)
      
    };
    

return (
    <div className="col s6 m4" onMouseEnter={showBorder} onMouseLeave={hideBorder} onClick={goToPokemonDetail}>
      <div className="card horizontal" style={{borderColor: color}}>
        <div className="card-image"> 
          <img src={pokemon.picture} alt={pokemon.name}/>
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{pokemon.name}</p>
            <p><small>{formatDate(pokemon.created || new Date())}</small></p>
            {pokemon.types.map( type => (
                <span key={type} className={formatType(type)}>{type}</span>
            ))}
          </div>
        </div>
      </div> 
    </div>
  );
}
  
export default PokemonCard;