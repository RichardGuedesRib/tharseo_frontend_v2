
import {useState} from "react"
import { Bot, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";


const filtersAsset = [
    { label: "Bitcoin - BTCUSDT", value: "BTCUSDT" },
    { label: "Binance Coin - BNBUSDT", value: "BNBUSDT" },
    { label: "Solana - SOLUSDT", value: "SOLUSDT" },
  ];

  
const filtersStrategy = [
    { label: "Grid dos 10%", value: "BTCUSDT" },
    { label: "Grid dos 20%", value: "BNBUSDT" },
  ];

   

export default function AddAutomatorModal() {
  const [selectedAsset, setSelectedAsset] = useState("Selecione o Ativo");
  const [selectedStrategy, setSelectedStrategy] = useState("Selecione a Estratégia");

  function onClick() {
   console.log("Clicou selecionando:" + selectedAsset + " e " + selectedStrategy);
  }

  return (
    <Drawer >
      <DrawerTrigger asChild >
      <div className="relative w-full sm:w-auto">
              <Button>
                <Bot />
                Adicionar Automação
              </Button>
            </div>
      </DrawerTrigger>
      <DrawerContent className="bg-bg-principal text-white">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Adicionar Automação</DrawerTitle>
            <DrawerDescription>Escolha o ativo e a estratégia que deseja automatizar</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center justify-between w-full  border border-gray-300 rounded-md px-3 py-2 text-sm bg-bg-principal text-white cursor-pointer hover:bg-gray-100 hover:text-gray-900">
                  {selectedAsset}
                  <ChevronDown className="w-4 h-4 text-white hover:text-gray-900" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-bg-principal text-white">
                {filtersAsset.map((filter) => (
                  <DropdownMenuItem key={filter.value} onClick={() => setSelectedAsset(filter.label)}>
                    {filter.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            </div>
            <div className="flex items-center justify-center space-x-2 mt-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center justify-between w-full  border border-gray-300 rounded-md px-3 py-2 text-sm bg-bg-principal text-white cursor-pointer hover:bg-gray-100 hover:text-gray-900">
                  {selectedStrategy}
                  <ChevronDown className="w-4 h-4 text-white hover:text-gray-900" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-bg-principal text-white">
                {filtersStrategy.map((filter) => (
                  <DropdownMenuItem key={filter.value} onClick={() => setSelectedStrategy(filter.label)}>
                    {filter.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            </div>
        
          </div>
          <DrawerFooter>
            <Button onClick={onClick}><Bot />Adicionar Automação</Button>
            <DrawerClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
