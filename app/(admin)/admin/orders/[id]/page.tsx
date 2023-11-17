import getOrderById from "@/lib/getOrderById"
import OrderDetail from "./order-detail"
import NullData from "@/components/null-data"

interface IParams {
  id: string
}

export default async function OrderDetailPage({ params }: { params: IParams }) {

  const order = await getOrderById(params)

  if(order === null) return <NullData title="Orden no encontrada"/>

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Detalle de la orden</h1>
      <OrderDetail order={order} />
    </>
  )
}
