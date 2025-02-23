import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bitcoin,  ExternalLink } from "lucide-react";
import { Label } from "@radix-ui/react-label";

export function CardAssetAllocation() {
  return (
    <>
      <Card className="bg-gray-800 text-white">
        <CardHeader className="flex flex-row align-center items-center w-full">
          <div className="bg-gray-500  flex flex-row rounded-full mr-2 justify-between">
            <Bitcoin size={40} />
          </div>
          <div className="flex flex-col justify-between  w-full">
            <div className="flex flex-row align-center items-center justify-between w-full ">
              <CardTitle>Bitcoinnn</CardTitle>
              <CardDescription className="text-white">$ 23,3B</CardDescription>
            </div>
            <div className="flex flex-row align-center items-center justify-between mt-1">
              <CardDescription>
                Deploy your new project in one-clickaa.
              </CardDescription>
              <ExternalLink />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-row align-center justify-center items-center gap-3">
          <Progress value={71.68} className="w-full" /> <Label>71.68%</Label>
        </CardContent>
      </Card>{" "}
    </>
  );
}
