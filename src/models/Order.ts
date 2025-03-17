import { Strategy } from "./Strategy";
import { Asset } from "./Wallet";

export interface Order {
    id?: number;
    assetId: string;
    quantity : string;
    userId : string;
    strategyId? : string;
    openDate : Date;
    closeDate? : Date;
    openPrice : number;
    closePrice? : number;
    typeOrder : string;
    targetPrice : number;
    stopPrice? : number;
    result? : number;
    status : string;
    isActive : boolean;
    asset? : Asset;
    strategy? : Strategy;
}