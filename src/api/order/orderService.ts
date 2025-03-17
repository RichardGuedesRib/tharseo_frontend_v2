import { useAuthStore } from "../../store/useAuthStore";
import useOrderStore from "../../store/useOrderStore";
import { Order } from "@/models/Order";



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

