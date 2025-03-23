import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PortfolioState {
  totalValue: number;
  totalQuantity: number;
  apy: number;
  symbol: string;
  chartTime: string;
  setTotalValue: (value: number) => void;
  setTotalQuantity: (value: number) => void;
  setApy: (value: number) => void;
  setSymbol: (symbol: string) => void;
  setChartTime: (time: string) => void;
}

const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      totalValue: 87743, 
      totalQuantity: 78342, 
      apy: 12.3, 
      symbol: "BTCUSDT", 
      chartTime: "1d", 
      setTotalValue: (value) => set({ totalValue: value }),
      setTotalQuantity: (value) => set({ totalQuantity: value }),
      setApy: (value) => set({ apy: value }),
      setSymbol: (symbol) => set({ symbol }),
      setChartTime: (time) => set({ chartTime: time }),
    }),
    {
      name: "portfolio-storage", 
    }
  )
);

export default usePortfolioStore;
