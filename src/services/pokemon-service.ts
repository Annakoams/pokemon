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
      const response = await fetch(PokemonService.apiUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Not a JSON response');
      }
  
      const data = await response.json();
      return data as Pokemon[];
    } catch (error) {
      console.error('Error fetching Pokemons:', error);
      throw error;
    }
  }

  static async getPokemon(id: number): Promise<Pokemon | null> {
    try {
      const response = await fetch(`${PokemonService.apiUrl}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return this.isEmpty(data) ? null : data;
    } catch (error) {
      console.error(`Error fetching Pokemon with id ${id}:`, error);
      return null;
    }
  }

  static async updatePokemon(id: number, updatedPokemon: Pokemon): Promise<Pokemon | null> {
    try {
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
    } catch (error) {
      console.error(`Error updating Pokemon with id ${id}:`, error);
      return null;
    }
  }

  static async deletePokemon(id : number): Promise<Pokemon | null> {
    try {
      const response = await fetch(`${PokemonService.apiUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
        
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return this.isEmpty(data) ? null : data;
    } catch (error) {
      console.error(`Error updating Pokemon with id ${id}:`, error);
      return null;
    }
  }
  static async addPokemon(newPokemon:Pokemon): Promise<Pokemon | null> {
    try {
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
    } catch (error) {
      console.error('Error adding Pokemon:', error);
      return null;
    }
  }
  static async searchPokemon(term: string): Promise<Pokemon[]> {
    try {
      const response = await fetch(`${PokemonService.apiUrl}?q=${term}`);
     
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
     
      const data = await response.json();
      return this.isEmpty(data) ? [] : data;
    } catch (error) {
      console.error('Error searching Pokemon:', error);
      return [];
    }
  }

 
  
  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  
}

