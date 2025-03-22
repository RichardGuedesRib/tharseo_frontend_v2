import { CardAssetAllocation } from "./card-asset-allocation";
import { Wallet } from "../models/Wallet";

interface ChainAllocationProps {
  wallets: Wallet[];
}

export function ChainAllocation({ wallets }: ChainAllocationProps) {

  console.log("wallets", wallets);
  return (
    <div className="flex flex-col items-center">
      {wallets.map((wallet) => (
        <div key={wallet.id}>
          <CardAssetAllocation wallet={wallet} />
        </div>
      ))}
    </div>
  );
}
