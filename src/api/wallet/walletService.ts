import { useAuthStore } from "../../store/useAuthStore";

export const getWalletsUser = async () => {

  const token = useAuthStore.getState().token;

  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/wallet",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
};
