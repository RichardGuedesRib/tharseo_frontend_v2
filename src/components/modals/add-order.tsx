import { useState } from "react";
import { Bot, ChevronDown, ArrowUp, ArrowDown, Loader2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import useAssetStore from "../../store/useAssetStore";
import { createOrderUser } from "@/api/order/orderService";

export default function AddOrderModal() {
  const [tradeType, setTradeType] = useState("BUY");
  const [orderType, setOrderType] = useState("MARKET");
  const [quantityType, setQuantityType] = useState("Quantidade");
  const [quantity, setQuantity] = useState("");
  const [target, setTarget] = useState("");
  const { assets } = useAssetStore();
  const [selectedAsset, setSelectedAsset] = useState<{
    id: string | null;
    name: string;
  }>({ id: null, name: "Selecione o Ativo" });
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    try {
    if (!quantity) {
      toast.error("Preencha todos os campos obrigatórios", {
        duration: 5000,
        position: "top-right",
      });
      return;
    }
 
    const data = {
      assetId: selectedAsset.id,
      quantity: quantity,
      quantityType: quantityType,
      strategyId: null,
      typeOrder : orderType,
      targetPrice : orderType === "LIMIT" ? target : null,
      side : tradeType,
    }

    const newTradeflow = await createOrderUser(data);

    if (newTradeflow.success) {
      toast.success("Ordem criada com sucesso!", {
        duration: 5000,
        position: "top-right",
      });
      window.location.reload();
    } else {
      toast.error("Erro ao criar ordem", {
        duration: 5000,
        position: "top-right",
      });
    }
  } catch (error) {
    toast.error("Erro ao criar ordem", {
      duration: 5000,
        position: "top-right",
    })
  } finally {
    setIsLoading(false);
  }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="relative w-full sm:w-auto">
          <Button>
            <Bot /> Abrir Ordem Manual
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-bg-principal text-white">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Abrir Ordem Manual</DrawerTitle>
            <DrawerDescription>
              Preencha as informações abaixo para abrir uma ordem
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center justify-between w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-bg-principal text-white cursor-pointer hover:bg-gray-100 hover:text-gray-900">
                    {selectedAsset.name}
                    <ChevronDown className="w-4 h-4 text-white hover:text-gray-900" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-48 bg-bg-principal text-white"
                >
                  {assets.map((asset) => (
                    <DropdownMenuItem
                      key={asset.id}
                      onClick={() =>
                        setSelectedAsset({ id: asset.id, name: asset.name })
                      }
                    >
                      {asset.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* Seleção de Compra/Venda */}
            <div className="flex space-x-2 mt-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center justify-between w-full border border-gray-300 rounded-md px-3 py-2 text-sm cursor-pointer bg-bg-principal text-white">
                    {tradeType === "BUY" ? (
                      <ArrowUp className="text-green-500" />
                    ) : (
                      <ArrowDown className="text-red-500" />
                    )}
                    {tradeType}
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem onClick={() => setTradeType("BUY")}>
                    {" "}
                    <ArrowUp className="text-green-500" /> BUY{" "}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTradeType("SELL")}>
                    {" "}
                    <ArrowDown className="text-red-500" /> SELL{" "}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Seleção de Quantidade ou Valor */}
            <div className="flex space-x-2 mt-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 text-sm cursor-pointer bg-bg-principal text-white w-32">
                    {quantityType}
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-32">
                  <DropdownMenuItem
                    onClick={() => setQuantityType("Quantidade")}
                  >
                    Quantidade
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem onClick={() => setQuantityType("Valor")}>
                    Valor
                  </DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
              <Input
                type="number"
                placeholder={quantityType}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            {/* Tipo de Ordem */}
            <div className="mt-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center justify-between w-full border border-gray-300 rounded-md px-3 py-2 text-sm cursor-pointer bg-bg-principal text-white">
                    {orderType}
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem onClick={() => setOrderType("MARKET")}>
                    MARKET
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem onClick={() => setOrderType("LIMIT")}>
                    LIMIT
                  </DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Campo TARGET */}
            <div className="mt-4">
              <Input
                type="number"
                placeholder="Target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                disabled={orderType === "MARKET"}
              />
            </div>
          </div>
          <DrawerFooter>
          <Button onClick={onClick} disabled={isLoading}> 
                {isLoading ? (
                  <Loader2 className="animate-spin w-4 h-4 mr-2" /> 
                ) : (
                  <Bot />
                )}
                {isLoading ? "Processando..." : "Adicionar Ordem"}
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
