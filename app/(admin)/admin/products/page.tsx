import getProducts from "@/lib/getProducts"
import { DataTableDemo } from "./manage-products"

export default async function ManageProductsPage() {
  const products = await getProducts()

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Administrar Productos</h1>
      <DataTableDemo products={products} />
    </>
  )
}