import { UserRegister } from "@/models/User";
import { SignIn } from "@/models/SignIn";

export const authService = {
    
    /**
     * Registra um novo usu rio no sistema
     * 
     * @param {UserRegister} data - Dados do usu rio a ser registrado
     * @returns {Promise<UserRegister>} - Usu rio registrado
     * @throws {Error} - Erro ao registrar usu rio
     */
    async signUp(data: UserRegister) {
      try {
  
        const response = await fetch(import.meta.env.VITE_API_URL + '/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.status === 201) {
          return await response.json();
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erro ao registrar usuário");
        }
      } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        throw error; 
      }
    },

    /**
     * Efetua o login de um usuário no sistema
     * 
     * @param {SignIn} data - Dados do usuário para autenticação
     * @returns {Promise<any>} - Resposta da API com informações do usuário autenticado
     * @throws {Error} - Erro ao efetuar login
     */

    async signIn(data: SignIn) {
      try {
  
        const response = await fetch(import.meta.env.VITE_API_URL + '/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.status === 200) {
          return await response.json();
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erro ao efetuar login");
        }
      } catch (error) {
        console.error("Erro ao efetuar login:", error);
        throw error; 
      }
    }

  }
  