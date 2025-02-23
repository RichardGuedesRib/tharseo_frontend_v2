import { Card, CardContent } from "@/components/ui/card";
import { AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from "recharts";
import { Wallet, PiggyBank, TrendingUp } from "lucide-react";

const data = [
  { date: "17 Mar", value: 150 },
  { date: "18 Mar", value: 180 },
  { date: "19 Mar", value: 200 },
  { date: "20 Mar", value: 400 },
  { date: "21 Mar", value: 350 },
  { date: "22 Mar", value: 450 },
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
      
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
