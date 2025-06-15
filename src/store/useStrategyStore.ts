import {create} from 'zustand';
import { persist } from "zustand/middleware";

interface Strategy {
  id: string;
  name: string;
  description: string;
  userId: string;
  performance: number | null;
  profit: number | null;
  isActive: boolean
  configStrategy: string | null;
}

interface StrategyStore {
  strategies: Strategy[];
  setStrategies: (strategies: Strategy[]) => void;
}

const useStrategyStore = create<StrategyStore>()(
    persist(
      (set) => ({
        strategies: [],
        setStrategies: (strategies: Strategy[]) => set({ strategies }),
      }),
      {
        name: "strategies-storage", 
      }
    )
  );

export default useStrategyStore;
