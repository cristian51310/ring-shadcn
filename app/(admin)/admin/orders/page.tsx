import NullData from "@/components/null-data";
import getOrders from "@/lib/getOrders";
import ManageOrders from "./manage-orders";

export default async function OrdersPage() {
  const orders = await getOrders()

  if (!orders || orders.length === 0) return <NullData title="No hay ordenes" />

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Administrar ordenes</h1>
      <ManageOrders orders={orders} />
    </>
  )
}