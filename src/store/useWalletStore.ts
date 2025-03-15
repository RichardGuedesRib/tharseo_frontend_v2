import {create} from 'zustand';
import { persist } from "zustand/middleware";

interface Asset {
  id: string;
  isActive: boolean;
  name: string;
  symbol: string;
}

interface Wallet {
  asset: Asset;
  assetId: string;
  id: string;
  isActive: boolean;
  isFavorite?: boolean;
  quantity: string;
  userId: string;
}

interface WalletStore {
  wallets: Wallet[];
  setWallets: (wallets: Wallet[]) => void;
}

const useWalletStore = create<WalletStore>()(
    persist(
      (set) => ({
        wallets: [],
        setWallets: (wallets: Wallet[]) => set({ wallets }),
      }),
      {
        name: "wallet-storage", 
      }
    )
  );

export default useWalletStore;
