"use client"
import Status from "@/components/status";
import { Button } from "@/components/ui/button";
import firebaseApp from "@/lib/firebase";
import { formatPrice } from "@/lib/formatPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Category } from "@prisma/client";
import { EyeOpenIcon, LoopIcon, TrashIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { MdClose, MdDone } from "react-icons/md";
import { toast } from "sonner";

interface AdminProductsProps {
  categories: Category[];
}

export default function ManageCategories({ categories }: AdminProductsProps) {
  const storage = getStorage(firebaseApp)
  const router = useRouter()

  let rows: any = []

  if (categories) {
    rows = categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      image: category.image,
    }))
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Nombre", width: 220 },
    {
      field: "action", headerName: "Acciones", width: 220, renderCell: (params) => (
        <div className="flex justify-between items-center gap-2">
          <Button variant="outline" size="icon"
            onClick={() => handleDelete(params.row.id, params.row.images)}
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

  const handleDelete = useCallback(async (id: string, images: [any]) => {
    toast.info("Borrando producto...")

    const handleImageDelete = async () => {
      try {
        for (const item of images) {
          if (item.image) {
            const imageRef = ref(storage, item.image)
            await deleteObject(imageRef)
            console.log("Image deleted")
          }
        }
      } catch (err: any) {
        console.log(err.message)
      }
    }

    await handleImageDelete()

    axios.delete(`/api/products/${id}`)
      .then(() => {
        toast.success("Producto borrado")
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