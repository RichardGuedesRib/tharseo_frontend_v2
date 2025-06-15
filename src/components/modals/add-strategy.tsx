import { useState } from "react";
import { ChartArea } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Strategy } from "@/models/Strategy";
import { toast } from "sonner";
import { createStrategyUser } from "../../api/strategy/strategyService";

export default function AddStrategyModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
    quantityGrids: "",
    valueOrder: "",
    profitTarget: "",
    variableOrder: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const configStrategy = JSON.stringify({
      quantityGrids: formData.quantityGrids,
      valueOrder: formData.valueOrder,
      profitTarget: formData.profitTarget,
      variableOrder: formData.variableOrder,
    });

    const newStrategy: Omit<
      Strategy,
      "id" | "userId" | "performance" | "profit"
    > = {
      name: formData.name,
      description: formData.description,
      isActive: formData.isActive,
      configStrategy,
    };

    try {
      const createdStrategy = await createStrategyUser(newStrategy);
      if (createdStrategy.success) {
        toast.success("Estratégia adicionada com sucesso!", {
          duration: 5000,
          position: "top-right",
        });
        
        formData.name = "";
        formData.description = "";
        formData.isActive = true;
        formData.quantityGrids = "";
        formData.valueOrder = "";
        formData.profitTarget = "";
        formData.variableOrder = "";
        window.location.reload();
      } else {
        toast.error("Erro ao adicionar estratégia", {
          duration: 5000,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Erro ao adicionar estratégia:", error);
      alert("Erro ao adicionar estratégia.");
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="relative w-full sm:w-auto">
          <Button onClick={() => setOpen(true)}>
            <ChartArea />
            Adicionar Estratégia
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-bg-principal text-white p-6">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="text-lg font-bold mb-4">Nova Estratégia</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Ativo (Switch) */}
            <div className="flex items-center space-x-2">
              <Label htmlFor="isActive">Ativo</Label>
              <Switch
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onCheckedChange={() =>
                  setFormData({ ...formData, isActive: !formData.isActive })
                }
              />
            </div>

            {/* ConfigStrategy Inputs */}
            <div>
              <Label htmlFor="quantityGrids">Quantidade de Grades</Label>
              <Input
                id="quantityGrids"
                name="quantityGrids"
                value={formData.quantityGrids}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="valueOrder">Valor da Ordem</Label>
              <Input
                id="valueOrder"
                name="valueOrder"
                value={formData.valueOrder}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="profitTarget">Meta de Lucro</Label>
              <Input
                id="profitTarget"
                name="profitTarget"
                value={formData.profitTarget}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="variableOrder">Ordem Variável</Label>
              <Input
                id="variableOrder"
                name="variableOrder"
                value={formData.variableOrder}
                onChange={handleChange}
                required
              />
            </div>

            {/* Botão de Envio */}
            <Button type="submit" className="w-full mt-4">
              Salvar Estratégia
            </Button>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
