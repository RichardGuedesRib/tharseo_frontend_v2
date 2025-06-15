import { useState } from "react";
import { Bot, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import useAssetStore from "../../store/useAssetStore";
import useStrategyStore from "../../store/useStrategyStore";
import { toast } from "sonner";
import {createTradeflowUser} from "../../api/tradeflow/tradeflowService";

export default function AddAutomatorModal() {
  const [selectedAsset, setSelectedAsset] = useState<{ id: string | null; name: string }>(
    { id: null, name: "Selecione o Ativo" }
  );
  const [selectedStrategy, setSelectedStrategy] = useState<{ id: string | null; name: string }>(
    { id: null, name: "Selecione a Estratégia" }
  );

  const { assets } = useAssetStore();
  const { strategies } = useStrategyStore();

  /**
   * Fun o chamada quando o usu rio clica no bot o de adicionar automa o.
   * Verifica se o usu rio selecionou um ativo e uma estrat gia, e se sim, chama a API para criar a automa o.
   * Se a API retornar um sucesso, exibe um toast de sucesso e recarrega a p gina.
   * Caso contr rio, exibe um toast de erro.
   */
  const onClick = async () => {
    if (!selectedAsset.id || !selectedStrategy.id) {
      toast.error("Por favor, selecione um ativo e uma estratégia", { duration: 5000, position: "top-right" });
      return;
    }

    const newTradeflow = await createTradeflowUser({
      assetId: selectedAsset.id,
      strategyId: selectedStrategy.id,
      isActive: false
    });

    if (newTradeflow.success) {
      toast.success("Automação criada com sucesso!", { duration: 5000, position: "top-right" });
      window.location.reload();
    } else {
      toast.error("Erro ao criar automação", { duration: 5000, position: "top-right" });
    }

  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="relative w-full sm:w-auto">
          <Button>
            <Bot />
            Adicionar Automação
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
            {/* Seleção de Ativo */}
            <div className="flex items-center justify-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center justify-between w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-bg-principal text-white cursor-pointer hover:bg-gray-100 hover:text-gray-900">
                    {selectedAsset.name}
                    <ChevronDown className="w-4 h-4 text-white hover:text-gray-900" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-bg-principal text-white">
                  {assets.map((asset) => (
                    <DropdownMenuItem
                      key={asset.id}
                      onClick={() => setSelectedAsset({ id: asset.id, name: asset.name })}
                    >
                      {asset.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Seleção de Estratégia */}
            <div className="flex items-center justify-center space-x-2 mt-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center justify-between w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-bg-principal text-white cursor-pointer hover:bg-gray-100 hover:text-gray-900">
                    {selectedStrategy.name}
                    <ChevronDown className="w-4 h-4 text-white hover:text-gray-900" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-bg-principal text-white">
                  {strategies.map((strategy) => (
                    <DropdownMenuItem
                      key={strategy.id}
                      onClick={() => setSelectedStrategy({ id: strategy.id, name: strategy.name })}
                    >
                      {strategy.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <DrawerFooter>
            <Button onClick={onClick}>
              <Bot />
              Adicionar Automação
            </Button>
            <DrawerClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
