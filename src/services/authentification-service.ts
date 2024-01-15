export default class AuthenticationService {
    static isAuthenticated: boolean = false;
  
    static login(username: string, password: string): Promise<boolean> {
      const isAuthenticated = username === 'pikachu' && password === 'pikachu';
  
      return new Promise<boolean>((resolve, reject) => {
        setTimeout(() => {
          this.isAuthenticated = isAuthenticated;
          resolve(isAuthenticated);
        }, 1000); // Ajout d'une valeur pour le temps du délai (en millisecondes)
      });
    }
  }
  