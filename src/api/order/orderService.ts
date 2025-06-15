import { useAuthStore } from "../../store/useAuthStore";
import useOrderStore from "../../store/useOrderStore";
import { Order } from "@/models/Order";



/**
 * Busca as ordens do usu rio logado.
 *
 * @throws Um erro caso n o seja poss vel efetuar a busca
 */
export const getOrderUser = async () => {
  const token = useAuthStore.getState().token;
  const { setOrders } = useOrderStore.getState();
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/v1/order",
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
      setOrders(data);
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error while fetching orders");
    }
  } catch (error) {
    console.error("Error while fetching orders:", error);
    throw error;
  }
};


/**
 * Atualiza uma ordem existente para o usuário logado.
 *
 * @param {Omit<Order, "asset" | "strategy">} data - Dados da ordem a ser atualizada, excluindo os campos "asset" e "strategy".
 * @returns {Promise<any>} - Resposta da API com informações da ordem atualizada.
 * @throws {Error} - Erro caso não seja possível atualizar a ordem.
 */

export const updateOrderUser = async (data: Omit<Order, "asset" | "strategy">) => {
  const token = useAuthStore.getState().token;

  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/v1/order/${data.id}`,
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
      await getOrderUser();
      return {
        success: true,
        message: "order updated successfully",
        data: await response.json(),
      };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error while updating order");
    }
  } catch (error) {
    console.error("Error while updating order:", error);
    throw error;
  }
};

/**
 * Cria uma nova ordem para o usuário logado.
 *
 * @param {any} data - Dados da ordem a ser criada.
 * @returns {Promise<any>} - Resposta da API com informações da ordem criada.
 * @throws {Error} - Erro caso não seja possível criar a ordem.
 */

export const createOrderUser = async (data: any) => {
  const token = useAuthStore.getState().token;
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/v1/order`,
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
      await getOrderUser();
      return {
        success: true,
        message: "order created successfully",
        data: await response.json(),
      };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error while created order");
    }
  } catch (error) {
    console.error("Error while created order:", error);
    throw error;
  }
};


/**
 * Cancela todas as ordens abertas do usuário logado.
 *
 * Faz uma chamada à API para deletar as ordens abertas. Em caso de sucesso, 
 * atualiza o estado global das ordens com os dados retornados. Caso ocorra
 * um erro, lança uma exceção com a mensagem apropriada.
 *
 * @throws {Error} - Erro caso não seja possível cancelar as ordens abertas
 */

export const cancelOpenOrders = async () => {
  const token = useAuthStore.getState().token;
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/v1/order/cancel-open-orders",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao cancelar ordens");
    }

    const responseData = await response.json();

    if (responseData.success) {
      return responseData; 
    } else {
      throw new Error(responseData.message || "Erro ao cancelar ordens");
    }
  } catch (error) {
    console.error("Error while fetching orders:", error);
    throw error;
  }
};

