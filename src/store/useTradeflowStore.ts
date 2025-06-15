import { Tradeflow } from '@/models/Tradeflow';
import {create} from 'zustand';
import { persist } from "zustand/middleware";

// Este arquivo cont m o estado global da aplica o para gerenciar as tradeflows do usu rio.
// Ele  uma implementa o de um store com o zustand que permite persistir os dados no localStorage.
// O store disponibiliza uma lista de tradeflows e uma fun o para atualizar essa lista.
interface TradeflowStore {
  tradeflows: Tradeflow[];
  setTradeflows: (tradeflows: Tradeflow[]) => void;
}

const useTradeflowStore = create<TradeflowStore>()(
    persist(
      (set) => ({
        tradeflows: [],
        setTradeflows: (tradeflows: Tradeflow[]) => set({ tradeflows }),
      }),
      {
        name: "tradeflows-storage", 
      }
    )
  );

export default useTradeflowStore;
