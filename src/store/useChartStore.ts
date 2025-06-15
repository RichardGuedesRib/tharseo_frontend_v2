import { create } from "zustand";

interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface ChartStore {
  asset: string;
  interval: string;
  candles: Candle[];
  setAsset: (asset: string) => void;
  setInterval: (interval: string) => void;
  fetchCandles: () => Promise<void>;
  startAutoUpdate: () => void;
}

export const useChartStore = create<ChartStore>((set, get) => {
  let intervalId: NodeJS.Timeout | null = null;

  const startAutoUpdate = () => {
    if (!intervalId) { 
      intervalId = setInterval(() => {
        get().fetchCandles(); 
      }, 5000);
    }
  };

  startAutoUpdate(); 

  return {
    asset: "BTCUSDT",
    interval: "1m",
    candles: [],

    setAsset: (asset) => {
      set({ asset });
      get().fetchCandles();
    },

    setInterval: (interval) => {
      set({ interval });
      get().fetchCandles();
    },

    fetchCandles: async () => {
      const { asset, interval } = get();
      const url = `https://api.binance.com/api/v3/klines?symbol=${asset}&interval=${interval}&limit=200`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        const candles = data.map((c: any) => ({
          time: c[0],
          open: parseFloat(c[1]),
          high: parseFloat(c[2]),
          low: parseFloat(c[3]),
          close: parseFloat(c[4]),
          volume: parseFloat(c[5]),
        }));

        set({ candles });
      } catch (error) {
        console.error("Erro ao buscar candles:", error);
      }
    },

    startAutoUpdate,
  };
});
