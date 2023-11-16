import CartClient from "./cart-client"
import { getCurrentUser } from "@/lib/getCurrentUser"

export default async function CartPage(){
  const user = await getCurrentUser()

  return(
    <div>
      <CartClient user={user} />
    </div>
  )
}