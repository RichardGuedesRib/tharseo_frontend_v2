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
import OpenTradesTable from "@/components/tables/open-trades-table";
import AddOrderModal from "@/components/modals/add-order";

  /**
   * Pagina de trades em andamento, contendo um título e filtros,
   * uma tabela com os trades em andamento e um botão para adicionar um novo trade.
   *
   * O componente OpenTrades é o principal da aplicação, ele renderiza
   * uma página com título, filtros e uma tabela com os trades em andamento.
   *
   * A página é renderizada em um container com fundo cinza claro e é
   * responsiva, ou seja, o layout muda de acordo com o tamanho da tela.
   *
   * O título da página é "Trades em Andamento" e tem um badge com o
   * número de trades em andamento.
   *
   * Os filtros são renderizados em um dropdown menu e permitem ao usuário
   * filtrar os trades em andamento por ativos ou inativos.
   *
   * A tabela é renderizada com os trades em andamento e tem as colunas
   * "Ativo", "Quantidade", "Pre o de Entrada", "Pre o Atual", "Lucro",
   * "Data de Entrada" e "Data de Sa da".
   *
   * O botão para adicionar um novo trade é renderizado em uma div com
   * fundo branco e tem um texto "Adicionar Novo Trade".
   */
const OpenTrades = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todos");

  const filters = [
    { label: "Ativos", value: "ativos" },
    { label: "Inativos", value: "inativos" },
    { label: "Inativos", value: "inativos" },
  ];

  return (
    <div className="w-full bg-bg-principal p-4 flex justify-center items-center flex-col gap-4">

      {/* Inicio Titulo e Filtros */}
      <div className="w-full border border-white rounded-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 text-white gap-4 sm:gap-0">
          <div className="flex items-center gap-2">
            <Label className="font-semibold text-2xl">Trades em Andamento</Label>
            <Badge variant="secondary">16 Trades</Badge>
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

            {/* Button */}
            <div className="relative w-full sm:w-auto">
            <AddOrderModal />
            </div>
          </div>
        </div>
      </div>
      {/* Fim Título e Filtros */}
      <OpenTradesTable /> 
     
    </div>
  );
};

export default OpenTrades;
