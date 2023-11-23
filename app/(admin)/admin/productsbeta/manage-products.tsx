"use client"
import Status from "@/components/status"
import { Button, buttonVariants } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import firebaseApp from "@/lib/firebase"
import { formatPrice } from "@/lib/formatPrice"
import { cn } from "@/lib/utils"
import { Product } from "@prisma/client"
import { EyeOpenIcon, LoopIcon } from "@radix-ui/react-icons"
import {
  ColumnDef, ColumnFiltersState, SortingState, VisibilityState,
  flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
  getSortedRowModel, useReactTable,
} from "@tanstack/react-table"
import axios from "axios"
import { deleteObject, getStorage, ref } from "firebase/storage"
import { ArrowUpDown, ChevronDown, TrashIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { MdClose, MdDone } from "react-icons/md"
import { toast } from "sonner"
import Image from "next/image"

interface AdminProductsProps {
  products: Product[];
}

export function DataTableDemo({ products }: AdminProductsProps) {
  const router = useRouter()
  const storage = getStorage(firebaseApp)

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const dataProducts = products

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "id",
      header: () => (<div className="hidden" />),
      cell: () => (<div className="hidden" />)
    },
    {
      accessorKey: "image",
      header: "Imagen",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.getValue("image")}
            alt={row.getValue("name")}
            width={60}
            height={60}
            className="w-20 h-20 object-cover rounded-md"
          />
        </div>
      ),
    },
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
              variant="success"
            />
          ) : (
            <Status
              text="Agotado"
              icon={MdClose}
              variant="error"
            />
          )}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center gap-2">
            <Button variant="outline" size="icon"
              onClick={() => handleToggleStock(row.getValue("id"), row.getValue("inStock"))}
            >
              <LoopIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon"
              onClick={() => handleDelete(row.getValue("id"), row.getValue("image"))}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
            <Link
              href={`/admin/products/${row.getValue("id")}`}
              className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
            >
              <EyeOpenIcon className="h-4 w-4" />
            </Link>
          </div>
        )
      },
    },
  ]

  const handleToggleStock = useCallback((id: string, inStock: boolean) => {
    toast.info("actualizando stock...")

    axios.put(`/api/products`, { id, inStock: !inStock })
      .then(() => {
        toast.success("Stock actualizado")
        router.refresh()
      })
      .catch((err) => {
        toast.error(err.message)
      })

  }, [router])

  const handleDelete = useCallback(async (id: string, image: any) => {
    toast.info("Borrando producto...")

    const handleImageDelete = async () => {
      try {
        if (image) {
          const imageRef = ref(storage, image)
          await deleteObject(imageRef)
        }
      } catch (err: any) {
        console.log(err.message)
      }
    }

    await handleImageDelete()

    axios.post(`/api/products/delete`, { id })
      .then(() => {
        toast.success("Producto Borrado")
        router.refresh()
      })
      .catch((err) => {
        toast.error(err.message)
      })

  }, [router, storage])


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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Mostrar Columnas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
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
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
          {table.getFilteredSelectedRowModel().rows.length} registro(s)
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
