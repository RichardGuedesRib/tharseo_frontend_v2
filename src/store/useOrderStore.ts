import { Order } from '@/models/Order';
import {create} from 'zustand';
import { persist } from "zustand/middleware";

// Este arquivo cont m o estado global da aplica o para gerenciar as ordens do usu rio.
// Ele  uma implementa o de um store com o zustand que permite persistir os dados no localStorage.
// O store disponibiliza uma lista de ordens e uma fun o para atualizar essa lista.
interface OrderStore {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
}

const useOrderStore = create<OrderStore>()(
    persist(
      (set) => ({
        orders: [],
        setOrders: (orders: Order[]) => set({ orders }),
      }),
      {
        name: "orders-storage", 
      }
    )
  );

export default useOrderStore;
