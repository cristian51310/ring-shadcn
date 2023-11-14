import { getCurrentUser } from "@/lib/getCurrentUser"
import getProducts from "@/lib/getProducts"
import AdminProducts from "./manage-products"
import NullData from "@/components/null-data"

export default async function ProductsPage(){
  const user = await getCurrentUser()
  const products = await getProducts({category: null})

  if(!user || user.role !== "ADMIN") return <NullData title="Acceso Denegado" />

  return(
    <>
      <h1 className="text-xl font-bold mb-4">Administrar Productos</h1>
      <AdminProducts products={products}/>
    </>
  )
}