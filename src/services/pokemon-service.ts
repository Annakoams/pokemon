import Pokemon from "../models/pokemon";
import POKEMONS from "models/mock-pokemon";

export default class PokemonService {

  static isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');

  static apiUrl = PokemonService.isDev
  ? 'http://localhost:3001/pokemons'
  :  (process.env.REACT_APP_API_URL || 'https://default-api-url/pokemons');

  static pokemons: Pokemon[] = POKEMONS;


  static async getPokemons(): Promise<Pokemon[]> {
    try {
      if (this.isDev) {
        const response = await fetch(`${PokemonService.apiUrl}`);
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Not a JSON response');
        }
  
        const data = await response.json();
        return data as Pokemon[];
      }
  
      return this.pokemons;
    } catch (error) {
      console.error('Error fetching Pokemons:', error);
      throw error;
    }
  }

  static async getPokemon(id: number): Promise<Pokemon | null> {
    try {
        if (this.isDev) {
            const response = await fetch(`${PokemonService.apiUrl}/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return this.isEmpty(data) ? null : data;
        }

        const foundPokemon = this.pokemons.find(pokemon => pokemon.id === id);
        return foundPokemon || null;
    } catch (error) {
        console.error(`Error fetching Pokemon with id ${id}:`, error);
        return null;
    }
}


static async updatePokemon(id: number, updatedPokemon: Pokemon): Promise<Pokemon | null> {
  try {
    if (this.isDev) {
      
      const response = await fetch(`${PokemonService.apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPokemon),
      });
      

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return this.isEmpty(data) ? null : data;
    }

    const index = this.pokemons.findIndex(pokemon => pokemon.id === id);
    if (index !== -1) {
      this.pokemons[index] = updatedPokemon;
      return updatedPokemon;
    } else {
      throw new Error(`Pokemon with id ${id} not found`);
    }
  } catch (error) {
    console.error(`Error updating Pokemon with id ${id}:`, error);
    return null;
  }
}


static async deletePokemon(id: number): Promise<Pokemon | null> {
  try {
      if (this.isDev) {
          const response = await fetch(`${PokemonService.apiUrl}/${id}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          return this.isEmpty(data) ? null : data;
      }

      const deletedPokemon = this.pokemons.find(pokemon => pokemon.id === id);
      if (deletedPokemon) {
          this.pokemons = this.pokemons.filter(pokemon => pokemon.id !== id);
      }
      return deletedPokemon || null;
  } catch (error) {
      console.error(`Error deleting Pokemon with id ${id}:`, error);
      return null;
  }
}

static async addPokemon(newPokemon: Pokemon): Promise<Pokemon | null> {
  try {
    if (this.isDev) {
      const response = await fetch(`${PokemonService.apiUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPokemon),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return this.isEmpty(data) ? null : data;
    }

       // Logique de production
       const addPokemons = [...this.pokemons, newPokemon];
       this.pokemons = addPokemons;
   
       return newPokemon;
  } catch (error) {
    console.error('Error adding Pokemon:', error);
    return null;
  }
}




static async searchPokemon(term: string): Promise<Pokemon[]> {
  try {
    console.log('Searching for:', term);

    if (this.isDev) {
      const response = await fetch(`http://localhost:3001/pokemons?q=${term}`);
      
      console.log('Dev Response:', response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Dev Results:', data);
      return data as Pokemon[];
    }

    // Utilisez votre logique de filtrage pour la production
    console.log('Production Results (Before Filtering):', this.pokemons);

  

    const results = this.pokemons.filter(pokemon => 
      pokemon.name.toLowerCase().includes(term.toLowerCase())
      
    );
    

    console.log('Production Results (After Filtering):', results);

    return results;
  } catch (error) {
    console.error('Error searching Pokemon:', error);
    throw error; // Propager l'erreur pour que le composant puisse la gérer correctement
  }
}



 
  
  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  static handleError(error: Error): void {
    console.error(error);
  }
}

