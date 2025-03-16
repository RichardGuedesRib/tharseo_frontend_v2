import { Asset } from '@/models/Asset';
import {create} from 'zustand';
import { persist } from "zustand/middleware";


interface AssetStore {
  assets: Asset[];
  setAssets: (asset: Asset[]) => void;
}

  /**
   * Atualiza o estado de assets no store.
   * @param {Asset[]} assets - Lista de assets a serem setadas.
   */
const useAssetStore = create<AssetStore>()(
    persist(
      (set) => ({
        assets: [],
        setAssets: (assets: Asset[]) => set({ assets }),
      }),
      {
        name: "assets-storage", 
      }
    )
  );

export default useAssetStore;
