import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle  } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bitcoin,  DollarSign, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import {CardAssetAllocation} from "./card-asset-allocation";


const assets = [
  { name: "Bitcoin", value: "$ 23,3B", percentage: 71.68, icon: <Bitcoin size={20} color="orange" /> },
  { name: "Ethereum", value: "$ 23,3B", percentage: 71.68, icon: <Bitcoin size={20} color="green" /> },
  { name: "Shiba", value: "$ 23,3B", percentage: 71.68, icon: <DollarSign size={20} color="red" /> },
  { name: "Solona", value: "$ 23,3B", percentage: 71.68, icon: <DollarSign size={20} color="purple" /> },
  { name: "Tether", value: "$ 23,3B", percentage: 71.68, icon: <DollarSign size={20} color="gray" /> },
];

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
