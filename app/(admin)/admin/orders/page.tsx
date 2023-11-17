import getOrders from "@/lib/getOrders"
import { DataTableDemo } from "./manage-orders"

export default async function ManageProductsPage() {
  const orders = await getOrders()

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Administrar Ordenes</h1>
      <DataTableDemo orders={orders} />
    </>
  )
}