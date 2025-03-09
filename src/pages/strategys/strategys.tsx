import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@radix-ui/react-label";
import { Search } from "lucide-react";
import AddStrategyModal from "@/components/modals/add-strategy";
import StrategysTable from "@/components/tables/strategy-tables";


/**
 * Página de estratégias.
 *
 * Renderiza uma página com um título e uma tabela com as estratégias cadastradas.
 *
 * A página é dividida em dois componentes principais:
 * - Um título com o nome da página e um bot o para adicionar uma nova estratégia.
 * - Uma tabela com as estratégias cadastradas.
 *
 * A tabela é renderizada com um componente {@link StrategysTable}.
 *
 * A página utiliza o hook de estado {@link useState} para armazenar o termo de busca.
 *
 * @returns {JSX.Element} A página de estratégias.
 */
const Strategys = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full bg-bg-principal p-4 flex justify-center items-center flex-col gap-4">
      {/* Inicio Titulo e Filtros */}
      <div className="w-full border border-white rounded-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 text-white gap-4 sm:gap-0">
          <div className="flex items-center gap-2">
            <Label className="font-semibold text-2xl">Estratégias</Label>
            <Badge variant="secondary">2 Estratégias</Badge>
          </div>

          <div className="flex flex-wrap gap-3 w-full sm:w-auto justify-between sm:justify-end items-center">
            {/* Search Input */}
            <div className="relative w-full sm:w-[200px]">
              <input
                type="text"
                placeholder="Buscar por estratégias"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-bg-principal text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>

            {/* Button */}
            <div className="relative w-full sm:w-auto">
              <AddStrategyModal />
            </div>
          </div>
        </div>
      </div>
      {/* Fim Título e Filtros */}
      <StrategysTable />
    </div>
  );
};

export default Strategys;
