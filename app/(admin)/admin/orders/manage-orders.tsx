"use client"
import Status from "@/components/status"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatPrice } from "@/lib/formatPrice"
import { Order, User } from "@prisma/client"
import { EyeOpenIcon } from "@radix-ui/react-icons"
import {
  ColumnDef, ColumnFiltersState, SortingState, VisibilityState,
  flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
  getSortedRowModel, useReactTable,
} from "@tanstack/react-table"
import axios from "axios"
import moment from "moment"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md"
import { toast } from "sonner"

interface ManageOrdersProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User
}

export function DataTableDemo({ orders }: ManageOrdersProps) {
  const router = useRouter()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  let rows: any = []

  if (orders) {
    rows = orders.map((order) => ({
      id: order.id,
      customer: order.user.name,
      amount: formatPrice(order.amount / 100),
      paymentStatus: order.status,
      date: moment(order.createDate).fromNow(),
      deliveryStatus: order.deliveryStatus,
    }))
  }

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: () => (<div className="hidden"/>),
      cell: () => (<div className="hidden"/>)
    },
    {
      accessorKey: "customer",
      header: "Cliente",
    },
    {
      accessorKey: "amount",
      header: "Total",
    },
    {
      accessorKey: "date",
      header: "Fecha",
    },
    {
      accessorKey: "deliveryStatus",
      header: "Entregado",
      cell: ({ row }) => (
        <div className="font-semibold">
          {row.getValue("deliveryStatus") === "pending" ? (
            <Status
              text="Pendiente"
              icon={MdAccessTimeFilled}
              variant="error"
            />
          ) : row.getValue("deliveryStatus") === "dispatched" ? (
            <Status
              text="Despachado"
              icon={MdDeliveryDining}
              variant="info"
            />
          ) : row.getValue("deliveryStatus") === "delivered" ? (
            <Status
              text="Entregado"
              icon={MdDone}
              variant="success"
            />
          ) : <></>}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        return (
          <div className="flex justify-evenly items-center gap-2">
            <Button variant="outline" size="icon"
              onClick={() => handleDispatch(row.getValue("id"))}
            >
              <MdDeliveryDining className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon"
              onClick={() => handleDeliver(row.getValue("id"))}
            >
              <MdDone className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon"
              onClick={() => router.push(`/admin/orders/${row.getValue("id")}`)}
            >
              <EyeOpenIcon className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const handleDispatch = useCallback((id: string) => {
    toast.info("Despachando Orden")
    axios.put(`/api/orders`, { id, deliveryStatus: "dispatched" })
      .then(() => {
        toast.success("Orden Despachada")
        router.refresh()
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }, [router])

  const handleDeliver = useCallback((id: string) => {
    toast.info("Entregando Orden")
    axios.put(`/api/orders`, { id, deliveryStatus: "delivered" })
      .then(() => {
        toast.success("Orden Entregada")
        router.refresh()
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }, [router])

  const table = useReactTable({
    data: rows,
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
    <>
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
    </>
  )
}
