import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ShowStrategy({
  open,
  setOpen,
  strategySelected,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  strategySelected: any;
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
      setFormData({
        quantityGrids: String(strategySelected.config?.quantityGrids ?? "0"),
        valueOrder: String(strategySelected.config?.valueOrder ?? "0"),
        profitTarget: String(strategySelected.config?.profitTarget ?? "0"),
        variableOrder: String(strategySelected.config?.variableOrder ?? "0"),
      });
    }
  }, [strategySelected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const savedData = {
      quantityGrids: Number(formData.quantityGrids),
      valueOrder: Number(formData.valueOrder),
      profitTarget: Number(formData.profitTarget),
      variableOrder: Number(formData.variableOrder),
    };
    console.log("Salvando dados:", savedData);
    setIsEditing(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full bg-bg-principal text-white">
        <DialogHeader>
          <DialogTitle>{strategySelected?.name ?? "Estratégia"}</DialogTitle>
          <DialogDescription>{strategySelected?.description ?? ""}</DialogDescription>
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
              <Button variant="outline" onClick={() => setIsEditing(false)}>
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
