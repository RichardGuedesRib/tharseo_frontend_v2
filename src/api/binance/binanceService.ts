export const getPriceAsset = async (symbol : string) => {

  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
        const data = await response.json();
     return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao efetuar login");
    }
  } catch (error) {
    console.error("Erro ao efetuar login:", error);
    throw error;
  }
};
