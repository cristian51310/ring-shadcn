"use client"
import Status from "@/components/status"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatPrice } from "@/lib/formatPrice"
import { Product } from "@prisma/client"
import { EyeOpenIcon, LoopIcon } from "@radix-ui/react-icons"
import {
  ColumnDef, ColumnFiltersState, SortingState, VisibilityState,
  flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
  getSortedRowModel, useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, TrashIcon } from "lucide-react"
import { useState } from "react"
import { MdClose, MdDone } from "react-icons/md"
import { toast } from "sonner"

interface AdminProductsProps {
  products: Product[];
}

export const columns: ColumnDef<Product>[] = [

  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombre
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "price",
    header: "Precio",
    cell: ({ row }) => (
      <div>{formatPrice(row.getValue("price"))}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => (
      <div>{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "inStock",
    header: "Disponible",
    cell: ({ row }) => (
      <div className="font-semibold">
        {row.getValue("inStock") ? (
          <Status
            text="En Stock"
            icon={MdDone}
            bg="bg-green-200"
            color="text-green-800"
          />
        ) : (
          <Status
            text="Agotado"
            icon={MdClose}
            bg="bg-red-200"
            color="text-red-800"
          />
        )}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Acciones",
    cell: () => {
      return (
        <div className="flex justify-evenly items-center gap-2">
          <Button variant="outline" size="icon"
            onClick={() => toast.success("Stock actualizado")}
          >
            <LoopIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon"
            onClick={() => toast.warning("Borrando ...")}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon"
            onClick={() => toast.info("Ver")}
          >
            <EyeOpenIcon className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]

export function DataTableDemo({ products }: AdminProductsProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const dataProducts = products

  const table = useReactTable({
    data: dataProducts,
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
  })

  return (
    <div className="">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar productos..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No hay resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">

        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} Fila(s) seleccionadas.
        </div>

        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
