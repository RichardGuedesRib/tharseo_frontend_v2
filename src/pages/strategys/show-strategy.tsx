import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Strategy } from "@/models/Strategy";
import { updateStrategyUser } from "../../api/strategy/strategyService";
import { toast } from "sonner";

export function ShowStrategy({
  open,
  setOpen,
  strategySelected,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  strategySelected: Strategy;
}) {
  const [formData, setFormData] = useState({
    quantityGrids: "0",
    valueOrder: "0",
    profitTarget: "0",
    variableOrder: "0",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (strategySelected) {
      const configStrategy = strategySelected.configStrategy
        ? JSON.parse(strategySelected.configStrategy)
        : null;

      setFormData({
        quantityGrids: configStrategy?.quantityGrids ?? "0",
        valueOrder: configStrategy?.valueOrder ?? "0",
        profitTarget: configStrategy?.profitTarget ?? "0",
        variableOrder: configStrategy?.variableOrder ?? "0",
      });
    }
  }, [strategySelected]);

  /**
   * Atualiza o estado `formData` com o valor do input
   * alterado.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * O evento de altera o do input.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Salva as altera es feitas na estratégia no banco de dados.
   *
   * Executa a chamada para a API de update de estratégias e, caso
   * a chamada seja bem sucedida, fecha o modal e atualiza o estado
   * de edição. Caso contrário, exibe um erro.
   */
  const handleSave = async () => {
    const savedData = {
      quantityGrids: String(formData.quantityGrids),
      valueOrder: String(formData.valueOrder),
      profitTarget: String(formData.profitTarget),
      variableOrder: String(formData.variableOrder),
    };

    const configString = JSON.stringify(savedData);
    strategySelected.configStrategy = configString;

    const updatedStrategy = await updateStrategyUser(strategySelected);
    if (updatedStrategy.success) {
      toast.success("Estratégia atualizada com sucesso!", {
        duration: 5000,
        position: "top-right",
      });

      setIsEditing(false);
      setOpen(false);
    } else {
      toast.error("Erro ao atualizar estratégia", {
        duration: 5000,
        position: "top-right",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full bg-bg-principal text-white">
        <DialogHeader>
          <DialogTitle>{strategySelected?.name ?? "Estratégia"}</DialogTitle>
          <DialogDescription>
            {strategySelected?.description ?? ""}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantityGrids" className="text-right">
              Quantidade de Grids
            </Label>
            <Input
              id="quantityGrids"
              name="quantityGrids"
              type="number"
              value={formData.quantityGrids}
              onChange={handleChange}
              disabled={!isEditing}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="valueOrder" className="text-right">
              Valor das Ordens
            </Label>
            <Input
              id="valueOrder"
              name="valueOrder"
              type="number"
              value={formData.valueOrder}
              onChange={handleChange}
              disabled={!isEditing}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profitTarget" className="text-right">
              Lucro Alvo(%)
            </Label>
            <Input
              id="profitTarget"
              name="profitTarget"
              type="number"
              value={formData.profitTarget}
              onChange={handleChange}
              disabled={!isEditing}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="variableOrder" className="text-right">
              Gap entre Grids(%)
            </Label>
            <Input
              id="variableOrder"
              name="variableOrder"
              type="number"
              value={formData.variableOrder}
              onChange={handleChange}
              disabled={!isEditing}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          {isEditing ? (
            <>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>Salvar</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Editar</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
