"use client"
import { useCart } from "@/hooks/useCart"
import { useRouter } from "next/navigation"
import { HiOutlineShoppingCart } from "react-icons/hi2"
import { Button } from "../ui/button"

const CartCount = () => {
  const router = useRouter()
  const { cartTotalQty } = useCart()

  return (
    <Button
      onClick={() => router.push('/cart')}
      variant={"outline"}
    >
      <HiOutlineShoppingCart
        className="text-lg text-muted-foreground mr-1.5"
      />
      <p className="text-muted-foreground">{cartTotalQty} Carrito</p>
    </Button>
  )
}

export default CartCount