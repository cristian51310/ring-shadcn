import { getCurrentUser } from "@/lib/getCurrentUser";
import ManageOrders from "./manage-orders";
import NullData from "@/components/null-data";
import getOrders from "@/lib/getOrders";

export default async function OrdersPage() {
  const user = await getCurrentUser()
  const orders = await getOrders()

  if (!user || user.role !== "ADMIN") return <NullData title="Acceso Denegado" />

  if(!orders || orders.length === 0) return <NullData title="No hay ordenes" />

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Administrar ordenes</h1>
      <ManageOrders orders={orders} />
    </>
  )
}