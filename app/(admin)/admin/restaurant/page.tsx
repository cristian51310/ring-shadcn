import NullData from "@/components/null-data"
import getProducts from "@/lib/getProducts"
import AdminProducts from "./manage-products"

export default async function ProductsPage() {
  const products = await getProducts()

  if (!products || products.length === 0) return <NullData title="No hay productos" />

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Administrar Productos</h1>
      <AdminProducts products={products} />
    </>
  )
}