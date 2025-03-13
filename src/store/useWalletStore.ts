import {create} from 'zustand';

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

const useWalletStore = create<WalletStore>((set : any) => ({
  wallets: [],
  setWallets: (wallets: Wallet[]) => set({ wallets }),
}));

export default useWalletStore;
