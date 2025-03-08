
// import {useState} from "react"
import {  ChartArea  } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Development from "../development";

   

/**
 * AddOrderModal
 *
 * Modal para abrir uma ordem manual. No momento, ele apenas abre um modal com
 * um bot o para fechar.
 *
 * @returns {JSX.Element}
 */
export default function AddOrderModal() {
  // const [selectedAsset, setSelectedAsset] = useState("Selecione o Ativo");
  // const [selectedStrategy, setSelectedStrategy] = useState("Selecione a Estratégia");

  // function onClick() {
  //  console.log("Clicou selecionando:" + selectedAsset + " e " + selectedStrategy);
  // }

  return (
    <Drawer >
      <DrawerTrigger asChild >
      <div className="relative w-full sm:w-auto">
              <Button>
                <ChartArea />
                Abrir Ordem Manual
              </Button>
            </div>
      </DrawerTrigger>
      <DrawerContent className="bg-bg-principal text-white">
        <div className="mx-auto w-full max-w-sm">
           <Development/>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
