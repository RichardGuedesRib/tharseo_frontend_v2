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
  ChartLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
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
import ShowTradeModal from "../modals/show-trade-details";

export default function CloseTradesTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  const mockOpenTrades = [
    {
      id: "1",
      openDate: "01/01/2023 12:00:00",
      quantity: "0.234",
      side: "BUY",
      typeOrder: "MARKET",
      openPrice: "1.234",
      closePrice: "1.454",
      targetPrice: "1.454",
      status: "CLOSE",
      strategy: "Grid dos 10%",
      result: "+32.54", 
      asset: {
        name: "Binance Coin",
        symbol: "BNBUSDT",
      }, 
    },
    {
      id: "2",
      openDate: "02/01/2023 12:00:00",
      quantity: "0.234",
      side: "SELL",
      typeOrder: "LIMIT",
      openPrice: "1.454",
      closePrice: "1.454",
      targetPrice: "1.454",
      status: "CLOSE",
      strategy: "Grid dos 10%",
      result: "+32.54", 
      asset: {
        name: "Binance Coin",
        symbol: "BNBUSDT",
      },     
    },
    
  ];

  useEffect(() => {
    setDataLoading(true);
    setData(mockOpenTrades);
    setDataLoading(false);
  }, []);

  //Colunas e Estrutura da Datatable - Ainda faltam rotas e store pra controle de estado
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "side",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="flex items-center hover:bg-bg-principal hover:text-blue-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            BUY/SELL
            <ArrowUpDown  />
          </Button>
        );
      },
      cell: ({ row }) => {
        console.log("row", row);
              return (
            <div className="flex items-center justify-center font-semibold text-base gap-2 text-xs">
              {row.original.side === "BUY" ? <ChartLine className="text-green-500"/> : <ChartLine className="text-red-500"/>}
              {row.original.side}
            </div>
        );
      },
    },
    {
      accessorKey: "openDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full justify-center text-center hover:bg-bg-principal hover:text-blue-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            DATA
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        console.log("row", row);
        return (
          <div className="flex flex-col">
            <div className="flex justify-center items-center font-semibold text-base text-xs text-center">
              {row.getValue("openDate")}
            </div>
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
          <div className="flex flex-col justify-start text-xs">
            <span>{(row.original.asset && row.original.asset.name) ?? ""}</span>
            <span>
              {(row.original.asset && row.original.asset.symbol) ?? ""}
            </span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full justify-center text-center hover:bg-bg-principal hover:text-blue-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            QUANTITADE
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.getValue("quantity")}
        </div>
      ),
    },

    {
      accessorKey: "openPrice",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full justify-center text-center hover:bg-bg-principal hover:text-blue-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            PREÇO ABERTURA
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue("openPrice")}</div>
      ),
    },
        {
        accessorKey: "result",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="w-full justify-center text-center hover:bg-bg-principal hover:text-blue-600"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              PROFIT/LOSS
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="capitalize text-center">{row.getValue("result")}</div>
        ),
      },
      {
        accessorKey: "gain",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="w-full justify-center text-center hover:bg-bg-principal hover:text-blue-600"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              GAIN/LOSS
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ }) => (
          <div className="capitalize text-center">+45%</div>
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
        cell: ({ row }) => (
          <div className="capitalize text-center">{row.getValue("status")}</div>
        ),
      },
      {
        accessorKey: "strategy",
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
        cell: ({ row }) => (
          <div className="capitalize text-center">{row.getValue("strategy")}</div>
        ),
      },
    
  

    {
      id: "actions",
      enableHiding: false,
      cell: ({row}) => {
        return (
          <div className="w-full flex justify-center items-center cursor-pointer hover:scale-110 transition">
        <ShowTradeModal orderId={row.original.id} />
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
