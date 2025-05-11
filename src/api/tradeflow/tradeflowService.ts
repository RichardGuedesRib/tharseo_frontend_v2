import { Tradeflow } from "@/models/Tradeflow";
import { useAuthStore } from "../../store/useAuthStore";
import useTradeflowStore from "../../store/useTradeflowStore";


/**
 * Busca as tradeflows do usu rio logado
 *
 * @returns Uma lista de tradeflows do usu rio logado
 * @throws Um erro caso n o seja poss vel efetuar a busca
 */

export const getTradeflowUser = async () => {
  const token = useAuthStore.getState().token;
  const { setTradeflows } = useTradeflowStore.getState();
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/v1/tradeflow",
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
      setTradeflows(data);
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error while fetching tradeflows");
    }
  } catch (error) {
    console.error("Error while fetching tradeflows:", error);
    throw error;
  }
};


/**
 * Atualiza uma tradeflow do usu rio logado
 *
 * @param {Tradeflow} data - Dados da tradeflow a ser atualizada
 * @returns {Promise<any>} - Resposta da API com informa es da tradeflow atualizada
 * @throws {Error} - Erro caso n o seja poss vel atualizar a tradeflow
 */
export const updatetradeflowUser = async (data: Omit<Tradeflow, "asset" | "strategy" | "createdAt">) => {
  const token = useAuthStore.getState().token;
  const { id, createdAt, ...dataWithoutIdAndCreatedAt } = data as any;

  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/v1/tradeflow/${data.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataWithoutIdAndCreatedAt),
      }
    );


    if (response.status === 200) {
      await getTradeflowUser();
      return {
        success: true,
        message: "tradeflow updated successfully",
        data: await response.json(),
      };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error while updating tradeflow");
    }
  } catch (error) {
    console.error("Error while updating tradeflow:", error);
    throw error;
  }
};


export const createTradeflowUser = async (data: any) => {
  const token = useAuthStore.getState().token;
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/v1/tradeflow`,
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
      await getTradeflowUser();
      return {
        success: true,
        message: "tradeflow created successfully",
        data: await response.json(),
      };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error while created tradeflow");
    }
  } catch (error) {
    console.error("Error while created tradeflow:", error);
    throw error;
  }
};

export const deleteTradeflowUser = async (id: string) => {
  const token = useAuthStore.getState().token;

  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/v1/tradeflow/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      await getTradeflowUser();
      return {
        success: true,
        message: "tradeflow deleted successfully",
        data: await response.json(),
      };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error while deleting tradeflow");
    }
  } catch (error) {
    console.error("Error while deleting tradeflow:", error);
    throw error;
  }
};
