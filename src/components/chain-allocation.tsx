import { CardAssetAllocation } from "./card-asset-allocation";

export function ChainAllocation() {
  return (
    <div className="flex flex-col items-center ">
      <CardAssetAllocation />
      <CardAssetAllocation />
      <CardAssetAllocation />
      <CardAssetAllocation />
      <CardAssetAllocation />
    </div>
  );
}
