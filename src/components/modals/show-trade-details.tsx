import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Development from "../development";
import { useEffect } from "react";



/**
 * Mostra o detalhe de uma ordem, com um bot o para fechar.
 *
 * @param {{ orderId: string }} props
 * @returns {JSX.Element}
 */

export default function ShowTradeModal({ orderId }: { orderId: string }) {
//   const [selectedAsset, setSelectedAsset] = useState("Selecione o Ativo");
//   const [selectedStrategy, setSelectedStrategy] = useState(
//     "Selecione a Estratégia"
//   );

  useEffect(() => {
 console.log("Abriu modal com orderId", orderId);
  }, []);

//   function onClick() {
//     console.log(
//       "Clicou selecionando:" + selectedAsset + " e " + selectedStrategy
//     );
//   }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="relative w-full sm:w-auto">
          <Button variant={"ghost"}>
            <Eye />
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


