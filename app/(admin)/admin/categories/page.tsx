import NullData from "@/components/null-data"
import getCategories from "@/lib/getCategories"
import ManageCategories from "./manage-categories"

export default async function ProductsPage() {
  const categories = await getCategories()
  if (!categories || categories.length === 0) return <NullData title="No hay Categorias" />

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Administrar Categorias</h1>
      <ManageCategories categories={categories} />
    </>
  )
}