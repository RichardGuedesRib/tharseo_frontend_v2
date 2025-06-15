import { useAuthStore } from "../../store/useAuthStore";
import useStrategyStore from "../../store/useStrategyStore";

/**
 * Busca as estrategias do usuario logado
 *
 * @returns Uma lista de estrat gias do usu rio logado
 * @throws Um erro caso n o seja poss vel efetuar a busca
 */
export const getStrategiesUser = async () => {
  const token = useAuthStore.getState().token;
  const { setStrategies } = useStrategyStore.getState();
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/v1/strategy",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      setStrategies(data);
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error while fetching strategies");
    }
  } catch (error) {
    console.error("Error while fetching strategies:", error);
    throw error;
  }
};

/**
 * Atualiza uma estrat gia do usu rio logado
 *
 * @param {any} data - Dados da estrat gia a ser atualizada
 * @returns {Promise<any>} - Resposta da API com informa es da estrat gia atualizada
 * @throws {Error} - Erro caso n o seja poss vel atualizar a estrat gia
 */
export const updateStrategyUser = async (data: any) => {
  const token = useAuthStore.getState().token;

  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/v1/strategy/${data.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (response.status === 200) {
      await getStrategiesUser();
      return {
        success: true,
        message: "Strategy updated successfully",
        data: await response.json(),
      };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error while updating strategy");
    }
  } catch (error) {
    console.error("Error while updating strategy:", error);
    throw error;
  }
};

/**
 * Cria uma nova estrat gia para o usu rio logado
 *
 * @param {any} data - Dados da estrat gia a ser criada
 * @returns {Promise<any>} - Resposta da API com informa es da estrat gia criada
 * @throws {Error} - Erro caso n o seja poss vel criar a estrat gia
 */
export const createStrategyUser = async (data: any) => {
  const token = useAuthStore.getState().token;
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/v1/strategy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (response.status === 201) {
      await getStrategiesUser();
      return {
        success: true,
        message: "Strategy created successfully",
        data: await response.json(),
      };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error while created strategy");
    }
  } catch (error) {
    console.error("Error while created strategy:", error);
    throw error;
  }
};
