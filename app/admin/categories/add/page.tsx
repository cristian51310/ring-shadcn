import NullData from "@/components/null-data"
import { getCurrentUser } from "@/lib/getCurrentUser"
import AddProductForm from "./add-form"

export default async function AddProductsPage() {
  const user = await getCurrentUser()

  if (!user || user.role !== "ADMIN") return <NullData title="Acceso Denegado" />

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Agregar Categoria</h1>
      <AddProductForm />
    </>
  )
}