"use client"
import Status from "@/components/status";
import { Button } from "@/components/ui/button";
import firebaseApp from "@/lib/firebase";
import { formatPrice } from "@/lib/formatPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Product } from "@prisma/client";
import { EyeOpenIcon, LoopIcon, TrashIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { MdClose, MdDone } from "react-icons/md";
import { toast } from "sonner";

interface AdminProductsProps {
  products: Product[];
}

export default function AdminProducts({ products }: AdminProductsProps) {
  const storage = getStorage(firebaseApp)
  const router = useRouter()

  let rows: any = []

  if (products) {
    rows = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      inStock: product.inStock,
      category: product.category,
    }))
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Nombre", width: 220 },
    {
      field: "price", headerName: "Precio", width: 110, renderCell: (params) => (
        <div className="font-bold">{formatPrice(params.row.price)}</div>
      )
    },
    { field: "category", headerName: "Categoría", width: 150 },
    {
      field: "inStock", headerName: "Stock", width: 130, renderCell: (params) => (
        <div className="font-bold">
          {params.row.inStock ? (
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
      )
    },
    {
      field: "action", headerName: "Acciones", width: 220, renderCell: (params) => (
        <div className="flex justify-between items-center gap-2">
          <Button variant="outline" size="icon"
            onClick={() => handleToggleStock(params.row.id, params.row.inStock)}
          >
            <LoopIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon"
            onClick={() => handleDelete(params.row.id, params.row.image)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon"
            onClick={() => router.push(`/admin/products/${params.row.id}`)}
          >
            <EyeOpenIcon className="h-4 w-4" />
          </Button>
        </div>
      )
    }
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
    console.log("image", image)
    console.log("id", id)

    const handleImageDelete = async () => {
      try {
        if (image) {
          const imageRef = ref(storage, image)
          await deleteObject(imageRef)
          console.log("Image deleted")
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

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  )
}