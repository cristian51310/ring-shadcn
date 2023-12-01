import { getCurrentUser } from "@/lib/getCurrentUser"
import CartClient from "./cart-client"

export default async function CartPage() {
  const user = await getCurrentUser()

  return (
    <div className="md:p-12 md:px-24 lg:px-40 p-8 ">
      <h1 className="text-3xl font-bold mb-4">Carrito de compras</h1>

      <CartClient user={user} />
    </div>
  )
}