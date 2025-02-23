import { Card } from "@/components/ui/card";
import { Wallet, PiggyBank, TrendingUp } from "lucide-react";
import CandlestickChart from "@/components/candlestick-chart";



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
