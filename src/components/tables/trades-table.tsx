"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  ArrowUpDown,
  ChevronDown,
  SquarePen,
  MoreHorizontal,
  Bot,
  ToggleRight,
  ToggleLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TradesTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  const mockStrategy = [
    {
      id: "1",
      userId: "Richard Guedes",
      name: "Grid dos 10%",
      description: "Descricao das estrategia do grid dos 10%",
      performance: 4589,
      profit: 11789,
      isActive: true,
      config: {
        quantityGrids: "10",
        valueOrder: "10",
        variableOrder: "1.50",
        profitTarget: "1.50",
      },
      asset: {
        name: "Binance Coin",
        symbol: "BNBUSDT",
      },
    },
    {
      id: "2",
      userId: "João Guedes",
      name: "Grid dos 20%",
      description: "Descricao das estrategia do grid dos 20%",
      performance: 9889,
      profit: 19789,
      isActive: false,
      config: {
        quantityGrids: 10,
        valueOrder: 10,
        variableOrder: 1.2,
        profitTarget: 1.5,
      },
      asset: {
        name: "Bitcoin",
        symbol: "BTCUSDT",
      },
    },
    {
        id: "2",
        userId: "Du Guedes",
        name: "Grid dos 20%",
        description: "Descricao das estrategia do grid dos 20%",
        performance: 9889,
        profit: 19789,
        isActive: false,
        config: {
          quantityGrids: 10,
          valueOrder: 10,
          variableOrder: 1.2,
          profitTarget: 1.5,
        },
        asset: {
          name: "Bitcoin",
          symbol: "BTCUSDT",
        },
      },
      {
        id: "2",
        userId: "Outro Guedes",
        name: "Grid dos 20%",
        description: "Descricao das estrategia do grid dos 20%",
        performance: 9889,
        profit: 19789,
        isActive: false,
        config: {
          quantityGrids: 10,
          valueOrder: 10,
          variableOrder: 1.2,
          profitTarget: 1.5,
        },
        asset: {
          name: "Bitcoin",
          symbol: "BTCUSDT",
        },
      },
  ];

  const handleActiveAutomator = (id : string) => {console.log("Ativou o trade: ", id)};

  useEffect(() => {
    setDataLoading(true);
    setData(mockStrategy);
    setDataLoading(false);
  }, []);

  //Colunas e Estrutura da Datatable - Ainda faltam rotas e store pra controle de estado
  const columns: ColumnDef<any>[] = [
    {
      id: "icon",
      enableHiding: false,
      cell: ({}) => {
        return (
          <div className="w-full flex justify-center">
            <Bot size={30} />
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full justify-center text-center hover:bg-bg-principal hover:text-blue-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ESTRATÉGIA
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        console.log("row", row);
        const quantityGrids =
          (row.original &&
            row.original.config &&
            row.original.config.quantityGrids) ??
          0;
        const valueOrder =
          (row.original &&
            row.original.config &&
            row.original.config.valueOrder) ??
          0;
        const variableOrder =
          (row.original &&
            row.original.config &&
            row.original.config.variableOrder) ??
          0;
        const profitTarget =
          (row.original &&
            row.original.config &&
            row.original.config.profitTarget) ??
          0;
        return (
          <div className="flex flex-col">
            <div className="flex justify-start items-center font-semibold text-base">
              {row.getValue("name")}
            </div>
            <div className="flex justify-start items-center text-xs">{`GRIDS: ${quantityGrids} | VALOR: ${valueOrder} | VARIAÇÃO: ${variableOrder} | ALVO: ${profitTarget}`}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "asset",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full justify-center text-center hover:bg-bg-principal hover:text-blue-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ATIVO
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex align-center items-center justify-start gap-2">
          <div className="flex justify-center items-center">
            <img
              src={`/images/${
                (row.original.asset && row.original.asset.symbol) ?? "BTCUSDT"
              }.png`}
              width={30}
            />
          </div>
          <div className="flex flex-col justify-start">
            <span>{(row.original.asset && row.original.asset.name) ?? ""}</span>
            <span>
              {(row.original.asset && row.original.asset.symbol) ?? ""}
            </span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full justify-center text-center hover:bg-bg-principal hover:text-blue-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            DESCRIÇÃO
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.getValue("description")}
        </div>
      ),
    },

    {
      accessorKey: "userId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full justify-center text-center hover:bg-bg-principal hover:text-blue-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            AUTOR
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue("userId")}</div>
      ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="w-full justify-center text-center hover:bg-bg-principal hover:text-blue-600"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              STATUS
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="flex justify-center items-center rounded-sm hover:cursor-pointer">
             <span>{row.original.isActive == true ? <ToggleRight className="text-green-400" size={40} onClick={() => {handleActiveAutomator(row.original.id)}}/> : <ToggleLeft className="text-red-400" size={40} onClick={() => {handleActiveAutomator(row.original.id)}}/>}</span>
            </div>
          );
        },
      },
    
  

    {
      id: "actions",
      enableHiding: false,
      cell: ({}) => {
        return (
          <div className="w-full flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">
                  <SquarePen className="h-4 w-4 mr-2" />
                  Opções aqui
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  //Formação da Tabela
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center align-center justify-between py-4">
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white ml-auto">
                Colunas
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>{" "}
         
        </div>
      </div>
      <div className="rounded-md text-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-bg-principal border-0"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-blue-500 border-0"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <>
                {dataLoading ? (
                  // Renderizar Skeleton para cada célula da tabela
                  <>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell colSpan={columns.length} className="h-10">
                          <Skeleton className="w-full h-10 rounded-md pulse" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Sem dados
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} ativos selecionados.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
