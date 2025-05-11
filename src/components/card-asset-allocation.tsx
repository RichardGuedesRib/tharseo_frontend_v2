import {
Card,
CardContent,
CardDescription,
CardHeader,
CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ExternalLink } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Wallet } from "../store/useWalletStore";
import usePortfolioStore from "@/store/usePortfolioStore";
import { useChartStore } from "@/store/useChartStore";
import {getAssetColor} from "../util/color-styte-asset";

interface CardAssetAllocationProps {
wallet: Wallet;
total : number;
}

export function CardAssetAllocation({ wallet, total }: CardAssetAllocationProps) {
const percent = parseFloat((total > 0 ? (wallet.totalValueUSD ?? 0) / total * 100 : 0).toFixed(2));

const {setAsset} = useChartStore();
const { setTotalValue, setTotalQuantity, setSymbol } = usePortfolioStore();

const handleLoadingInfo = async () => {
setAsset(wallet.asset.symbol);
setTotalValue(wallet.totalValueUSD!);
setTotalQuantity(Number(wallet.quantity!));
setSymbol(wallet.asset.symbol);
}

return (
<>
    <Card className="text-white max-w-sm mx-auto shadow-none border-none bg-transparent">
        <CardHeader className="flex flex-row align-center items-center w-full space-y-1 p-2">
            <div className="bg-gray-500  flex flex-row rounded-full mr-2 justify-between">
                <img src={`/images/${ (wallet && wallet.asset.symbol) ?? "BTCUSDT" }.png`} width={45} />
            </div>
            <div className="flex flex-col justify-between  w-full">
                <div className="flex flex-row align-center items-center justify-between w-full ">
                    <CardTitle>{wallet && wallet.asset.name}</CardTitle>
                    <CardDescription className="text-white">{wallet && wallet.asset.symbol}</CardDescription>
                </div>
                <div className="flex flex-row align-center items-center justify-between mt-2">
                    <CardDescription>
                        Deploy your new project in one-clickaa.
                    </CardDescription>
                    <ExternalLink className="hover:text-blue-600 hover:cursor-pointer" onClick={handleLoadingInfo} />
                </div>
            </div>
        </CardHeader>
        <CardContent className="flex flex-row align-center justify-center items-center gap-3 p-1">
            <Progress value={percent} className="w-full [&>div]:bg-[var(--progress-color)]" style={{ "--progress-color": getAssetColor(wallet.asset.symbol) } as React.CSSProperties} /> <Label>{percent.toFixed(2) + "%"}</Label>
        </CardContent>
      </Card>{" "}
    </>
  );
}
