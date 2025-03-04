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
  Star,
  BadgeCheck,
  MoreHorizontal,
  ChartScatter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
import { Separator } from "@/components/ui/separator";
import { ShowStrategy } from "./show-strategy";

export default function Strategys() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [openStrategy, setOpenStrategy] = useState(false);
  const [strategySelected, setStrategySelected] = useState<any>();


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
        
      }
    },
    {
      id: "2",
      userId: "João Guedes",
      name: "Grid dos 20%",
      description: "Descricao das estrategia do grid dos 20%",
      performance: 9889,
      profit: 19789,
      isActive: true,
      config: {
        quantityGrids: 10,
        valueOrder: 10,
        variableOrder: 1.2,
        profitTarget: 1.5,
        
      }
    },
  
  ];

  useEffect(() => {
    setDataLoading(true);
    setData(mockStrategy);
    setDataLoading(false);
  }, []);

  //Colunas e Estrutura da Datatable - Ainda faltam rotas e store pra controle de estado
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "isActive",
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
          <div className="flex justify-center items-center">
            {row.getValue("isActive") ? (
              <BadgeCheck className="text-green-500" />
            ) : (
              <BadgeCheck className="text-gray-400" />
            )}
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
            NOME
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue("name")}</div>
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
        <div className="capitalize text-center">{row.getValue("description")}</div>
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
      accessorKey: "performance",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full justify-center text-center hover:bg-bg-principal hover:text-blue-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            PERFORMANCE
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase text-center">{row.getValue("performance")}</div>
      ),
    },
    {
      accessorKey: "profit",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full justify-center text-center hover:bg-bg-principal hover:text-blue-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            PROFIT
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase text-center">{row.getValue("profit")}</div>
      ),
    },
  
    {
      id: "actions",
      enableHiding: false,
      cell: ({row }) => {
        return (
          <div className="w-full flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer" onClick={() => {setStrategySelected(row.original); setOpenStrategy(true)}}>
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
      <div className="flex items-center justify-start align-center text-white text-3xl mr-10 gap-2"><ChartScatter className="w-8 h-8"/>Estratégias</div>
      <Separator className="my-6" />
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
          </DropdownMenu>          <Input
            placeholder="Buscar por nome..."
            value={
              (table.getColumn("name")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm text-white"
          />
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
      <ShowStrategy open={openStrategy} setOpen={setOpenStrategy} strategySelected={strategySelected}/>
    </div>
  );
}
