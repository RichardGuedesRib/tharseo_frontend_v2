import { UserRegister } from "@/models/User";

export const authService = {
    
    /**
     * Registra um novo usu rio no sistema
     * 
     * @param {UserRegister} data - Dados do usu rio a ser registrado
     * @returns {Promise<UserRegister>} - Usu rio registrado
     * @throws {Error} - Erro ao registrar usu rio
     */
    async registerUser(data: UserRegister) {
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
    }
  };
  