import { Card, CardContent } from "@/components/ui/card";
import { Wallet, PiggyBank, TrendingUp } from "lucide-react";
import CandlestickChart from "@/components/candlestick-chart";

const data = [
  { date: "17 Mar", open: 150, close: 180, high: 190, low: 140 },
  { date: "18 Mar", open: 180, close: 200, high: 220, low: 170 },
  { date: "19 Mar", open: 200, close: 400, high: 420, low: 180 },
  { date: "20 Mar", open: 400, close: 350, high: 410, low: 330 },
  { date: "21 Mar", open: 350, close: 450, high: 470, low: 340 },
  { date: "22 Mar", open: 450, close: 430, high: 480, low: 420 },
];

export function PortfolioPerformance() {
  return (
    <Card className="p-4 bg-black text-white rounded-xl">
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wallet size={24} /> 
          <div>
            <p className="text-gray-400 text-sm">Valor total</p>
            <p className="text-lg font-semibold">$ 87.743</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <PiggyBank size={24} />
          <div>
            <p className="text-gray-400 text-sm">Total depósito</p>
            <p className="text-lg font-semibold">$ 78,342</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp size={24} />
          <div>
            <p className="text-gray-400 text-sm">APY</p>
            <p className="text-lg font-semibold">+ 12.3%</p>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-2">Performance do portfólio</h2>

      <CandlestickChart />

    
    </Card>
  );
}
