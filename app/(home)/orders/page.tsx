import NullData from "@/components/null-data";
import { getCurrentUser } from "@/lib/getCurrentUser";
import getOrdersByUserId from "@/lib/getOrdersByUserId";
import OrdersClient from "./orders-client";

export default async function OrdersPage() {
  const user = await getCurrentUser()

  if (!user) return <NullData title="Acceso Denegado" />

  const orders = await getOrdersByUserId(user.id)

  if (!orders) return <NullData title="No hay ordenes" />

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Administrar Ordenes</h1>
      <OrdersClient orders={orders} />
    </div>
  )
}