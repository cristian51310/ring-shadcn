import getCategories from "@/lib/getCategories"

export default async function ProductsPage() {
  const categories = await getCategories()

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Administrar Categorias</h1>
    </>
  )
}