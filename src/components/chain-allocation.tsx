import { CardAssetAllocation } from "./card-asset-allocation";
import { Wallet } from "../models/Wallet";

interface ChainAllocationProps {
  wallets: Wallet[];
  total: number;
}

export function ChainAllocation({ wallets, total }: ChainAllocationProps) {

  console.log("wallets", wallets);
  console.log("total no comp", total);
  return (
    <div className="flex flex-col items-center">
      {wallets.map((wallet) => (
        <div key={wallet.id}>
          <CardAssetAllocation wallet={wallet} total={total} />
        </div>
      ))}
    </div>
  );
}
