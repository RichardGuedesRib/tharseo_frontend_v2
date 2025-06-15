import { useAuthStore } from "../../store/useAuthStore";
import useAssetStore from "../../store/useAssetStore";



/**
 * Obtém a lista de ativos do servidor e atualiza o estado local.
 * 
 * Esta função faz uma requisição GET à API para buscar os ativos disponíveis.
 * Se a requisição for bem-sucedida (status 200), a lista de ativos é atualizada no estado local.
 * Em caso de falha, um erro é lançado com a mensagem de erro retornada pela API.
 * 
 * @throws {Error} - Erro caso não seja possível obter os ativos
 */

export const getAssets = async () => {
  const token = useAuthStore.getState().token;
  const { setAssets } = useAssetStore.getState();
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/asset",
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
      setAssets(data);
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error while fetching assets");
    }
  } catch (error) {
    console.error("Error while fetching assets:", error);
    throw error;
  }
};

