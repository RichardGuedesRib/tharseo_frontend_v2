import { Card } from "@/components/ui/card";
import { Wallet, PiggyBank, ChevronDown } from "lucide-react";
import CandlestickChart from "@/components/candlestick-chart";
import usePortfolioStore from "@/store/usePortfolioStore";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useChartStore } from "@/store/useChartStore";


export function PortfolioPerformance() {

  const { totalValue, totalQuantity, symbol } = usePortfolioStore();
  const { setInterval, interval } = useChartStore();
  return (
    <Card className="p-4 bg-black text-white rounded-xl">
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wallet size={24} /> 
          <div>
            <p className="text-gray-400 text-sm">Valor total</p>
            <p className="text-lg font-semibold">$ {totalValue}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <PiggyBank size={24} />
          <div>
            <p className="text-gray-400 text-sm">Quantidade</p>
            <p className="text-lg font-semibold">{totalQuantity}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
        <img
              src={`/images/${
                (symbol) ?? "BTCUSDT"
              }.png`}
              width={45}
            />
          <div>
            <p className="text-gray-400 text-sm">ATIVO</p>
            <p className="text-lg font-semibold">{symbol}</p>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-2">Performance do portfólio</h2>

      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-gray-900 text-white border-gray-700 flex items-center gap-2">
          {interval || "Selecionar Período"}
          <ChevronDown size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-900 text-white border-gray-700">
        <DropdownMenuItem onClick={() => setInterval("1m")}>1 Minuto</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setInterval("5m")}>5 Minutos</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setInterval("15m")}>15 Minutos</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setInterval("1h")}>1 Hora</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setInterval("4h")}>4 Horas</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setInterval("1d")}>1 Dia</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

      <CandlestickChart />

    
    </Card>
  );
}
