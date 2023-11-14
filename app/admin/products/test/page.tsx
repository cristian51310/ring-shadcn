import NullData from "@/components/null-data"
import { getCurrentUser } from "@/lib/getCurrentUser"
import getProducts from "@/lib/getProducts"
import { DataTableDemo } from "./manage-products"


export default async function ManageProductsPage() {
  const products = await getProducts({ category: null })
  const user = await getCurrentUser()

  if (!user || user.role !== "ADMIN") return <NullData title="Acceso Denegado" />

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Administrar Productos</h1>
      <DataTableDemo />
    </div>
  )
}