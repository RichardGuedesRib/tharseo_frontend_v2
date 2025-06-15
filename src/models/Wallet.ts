export interface Wallet {
    id: string;
    assetId: string;
    isActive: boolean;
    isFavorite?: boolean;
    quantity: string;
    userId: string;
    asset: Asset;
}

export interface Asset {
    id: string;
    name: string;
    symbol : string;
    isActive: boolean;
}