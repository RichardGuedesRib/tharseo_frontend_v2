export interface UpdateUserProfile {
  name: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const userService = {
  /**
   * Atualiza o perfil do usuário logado
   * 
   * @param {UpdateUserProfile} data - Dados do perfil a serem atualizados
   * @param {string} token - Token de autenticação do usuário
   * @returns {Promise<any>} - Resposta da API com dados atualizados
   * @throws {Error} - Erro ao atualizar perfil
   */
  async updateProfile(data: UpdateUserProfile, token: string) {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao atualizar perfil");
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      throw error;
    }
  },

  /**
   * Altera a senha do usuário logado
   * 
   * @param {ChangePassword} data - Dados para alteração de senha
   * @param {string} token - Token de autenticação do usuário
   * @returns {Promise<any>} - Resposta da API com confirmação
   * @throws {Error} - Erro ao alterar senha
   */
  async changePassword(data: ChangePassword, token: string) {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao alterar senha");
      }
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      throw error;
    }
  },
};