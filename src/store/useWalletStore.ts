import { create } from 'zustand';
import { persist } from "zustand/middleware";

interface Asset {
  id: string;
  isActive: boolean;
  name: string;
  symbol: string;
}

export interface Wallet {
  asset: Asset;
  assetId: string;
  id: string;
  isActive: boolean;
  isFavorite?: boolean;
  quantity: string; 
  userId: string;
  priceInUSD?: number; 
  totalValueUSD?: number;
  percentOfTotalPortfolio?: number; 
}

interface WalletStore {
  wallets: Wallet[];
  setWallets: (wallets: Wallet[]) => void;
  updatePriceForAsset: (symbol: string) => Promise<void>; 
}

const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      wallets: [],
      setWallets: (wallets: Wallet[]) => set({ 
        wallets: wallets.map(wallet => ({
          ...wallet,
          totalValueUSD: wallet.totalValueUSD ?? 0, 
        }))
      }),

      updatePriceForAsset: async (symbol: string) => {
        if (symbol === 'USDT') {
          
          return;
        }

        try {
          
          const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
          const data = await response.json();
          const priceInUSD = parseFloat(data.price);

          const updatedWallets = get().wallets.map(wallet => {
            if (wallet.asset.symbol === symbol) {
              return {
                ...wallet,
                priceInUSD,
                totalValueUSD: parseFloat(wallet.quantity) * priceInUSD,
              };
            }
            return wallet;
          });
          
          set({ wallets: updatedWallets });
        } catch (error) {
          console.error('Error fetching asset price:', error);
        }
      },

     
    }),
    {
      name: "wallet-storage", 
    }
  )
);

export default useWalletStore;
