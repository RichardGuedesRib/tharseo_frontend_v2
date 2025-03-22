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
import { Wallet } from "@/models/Wallet";

interface CardAssetAllocationProps {
  wallet: Wallet;
}

export function CardAssetAllocation({ wallet }: CardAssetAllocationProps) {
  return (
    <>
      <Card className="text-white max-w-sm mx-auto shadow-none border-none bg-transparent">
        <CardHeader className="flex flex-row align-center items-center w-full space-y-1 p-2">
          <div className="bg-gray-500  flex flex-row rounded-full mr-2 justify-between">
            <img
              src={`/images/${
                (wallet && wallet.asset.symbol) ?? "BTCUSDT"
              }.png`}
              width={45}
            />
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
              <ExternalLink />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-row align-center justify-center items-center gap-3 p-1">
          <Progress value={61.68} className="w-full" /> <Label>71.68%</Label>
        </CardContent>
      </Card>{" "}
    </>
  );
}
