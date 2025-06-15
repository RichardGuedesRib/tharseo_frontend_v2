import { Asset } from "./Asset";
import { Strategy } from "./Strategy";

export interface Tradeflow {
    id: string;
    assetId: string;
    strategyId: string;
    isActive : boolean;
    createdAt?: Date;
    strategy: Strategy;
    asset: Asset;  
}