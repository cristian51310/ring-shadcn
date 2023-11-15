import NullData from "@/components/null-data"
import { getCurrentUser } from "@/lib/getCurrentUser"
import ManageCategories from "./manage-categories"
import getCategories from "@/lib/getCategories"

export default async function ProductsPage() {
  const user = await getCurrentUser()
  const categories = await getCategories()

  if (!user || user.role !== "ADMIN") return <NullData title="Acceso Denegado" />

  if (!categories || categories.length === 0) return <NullData title="No hay Categorias" />

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Administrar Categorias</h1>
      <ManageCategories categories={categories} />
    </>
  )
}