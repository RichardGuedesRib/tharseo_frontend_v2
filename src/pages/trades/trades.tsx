import { useState } from "react";
import { Badge } from "@/components/ui/badge";

import { Label } from "@radix-ui/react-label";
import MenuTrade from "@/components/menu-trades";
import { Search } from "lucide-react";
import TradesTable from "@/components/tables/trades-table";
import AddAutomatorModal from "@/components/modals/add-strategy-automator";

const Trades = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full bg-bg-principal p-4 flex justify-center items-center flex-col gap-4">
      <MenuTrade />

      {/* Inicio Titulo e Filtros */}
      <div className="w-full border border-white rounded-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 text-white gap-4 sm:gap-0">
          <div className="flex items-center gap-2">
            <Label className="font-semibold text-2xl">Minhas Automações</Label>
            <Badge variant="secondary">7 Automações</Badge>
          </div>

          <div className="flex flex-wrap gap-3 w-full sm:w-auto justify-between sm:justify-end items-center">
            {/* Dropdown Select */}
            {/* <DropdownMenu>
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
            </DropdownMenu> */}

            {/* Search Input */}
            <div className="relative w-full sm:w-[200px]">
              <input
                type="text"
                placeholder="Buscar por automações"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-bg-principal text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>

            {/* Button */}
            <div className="relative w-full sm:w-auto">
            <AddAutomatorModal />
            </div>
          </div>
        </div>
      </div>
      {/* Fim Título e Filtros */}
      <TradesTable /> 
     
    </div>
  );
};

export default Trades;
