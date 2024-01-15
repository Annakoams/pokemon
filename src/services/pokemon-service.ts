import Pokemon from "../models/pokemon";

export default class PokemonService {

  static async getPokemons(): Promise<Pokemon[]> {
    try {
      const response = await fetch('http://localhost:3001/pokemons');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Pokemons:', error);
      return [];
    }
  }

  static async getPokemon(id: number): Promise<Pokemon | null> {
    try {
      const response = await fetch(`http://localhost:3001/pokemons/${id}`);
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
      const response = await fetch(`http://localhost:3001/pokemons/${id}`, {
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
      const response = await fetch(`http://localhost:3001/pokemons/${id}`, {
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
      const response = await fetch(`http://localhost:3001/pokemons`, {
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
      const response = await fetch(`http://localhost:3001/pokemons?q=${term}`);
     
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

