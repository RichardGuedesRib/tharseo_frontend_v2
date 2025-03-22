import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@radix-ui/react-label";
import { Search, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import CloseTradesTable from "@/components/tables/close-trades-table";
import useOrderStore from "@/store/useOrderStore";
import { getOrderUser } from "@/api/order/orderService";
import { useEffect } from "react";

/**
 * Componente que exibe o histórico de trades.
 * 
 * Este componente inclui um título com um badge indicando o número de trades,
 * um menu suspenso para filtrar os trades por estado (Cancelado ou Fechado),
 * e um campo de busca para buscar por ativos específicos. 
 * 
 * Retorna um layout com os filtros e a tabela de trades fechados.
 */

const HistoricTrade = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const { orders } = useOrderStore();
  const filters = [
    { label: "Canceled", value: "canceled" },
    { label: "Close", value: "close" },
  ];

    const updateOrdersData = async () => {
        await getOrderUser();
      };
    
      useEffect(() => {
        updateOrdersData();
      }, []);

      const filteredOrders = orders?.filter(order => 
        ["CANCELADO", "FINALIZADO", "EXECUTADA"].includes(order.status)
      );


  return (
    <div className="w-full bg-bg-principal p-4 flex justify-center items-center flex-col gap-4">

      {/* Inicio Titulo e Filtros */}
      <div className="w-full border border-white rounded-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 text-white gap-4 sm:gap-0">
          <div className="flex items-center gap-2">
            <Label className="font-semibold text-2xl">Hitórico de Trades</Label>
            <Badge variant="secondary">{filteredOrders?.length}</Badge>
          </div>

          <div className="flex flex-wrap gap-3 w-full sm:w-auto justify-between sm:justify-end items-center">
            {/* Dropdown Select */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center justify-between w-full sm:w-[200px] border border-gray-300 rounded-md px-3 py-2 text-sm bg-bg-principal text-white cursor-pointer hover:bg-gray-100 hover:text-gray-900">
                  {selectedFilter}
                  <ChevronDown className="w-4 h-4 text-white hover:text-gray-900" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-bg-principal text-white">
                {filters.map((filter) => (
                  <DropdownMenuItem key={filter.value} onClick={() => setSelectedFilter(filter.label)}>
                    {filter.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search Input */}
            <div className="relative w-full sm:w-[200px]">
              <input
                type="text"
                placeholder="Buscar por ativos"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-bg-principal text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
           
          </div>
        </div>
      </div>
      {/* Fim Título e Filtros */}
      <CloseTradesTable historicorders={filteredOrders} /> 
     
    </div>
  );
};

export default HistoricTrade;
