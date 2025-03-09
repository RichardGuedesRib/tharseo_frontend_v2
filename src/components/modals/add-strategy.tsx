import { ChartArea } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Development from "../development";

/**
 * AddStrategyModal
 *
 * Abre um modal para adicionar uma estratégia. 
 * O modal é ativado por um botão que contém um ícone de gráfico.
 *
 * @returns {JSX.Element}
 */

export default function AddStrategyModal() {

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="relative w-full sm:w-auto">
        <Button>
                <ChartArea />
                Adicionar Estratégia
              </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent
       className="bg-bg-principal text-white " 
      >
        <div className="mx-auto w-full max-w-sm">
        <Development/>
        </div>
      </DrawerContent>
    </Drawer>
  );
}


