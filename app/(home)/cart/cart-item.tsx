"use client"

import { useCart } from "@/hooks/useCart"
import { CartProductType } from "@/types/cart-pruduct-type"

interface CartItemProps {
  item: CartProductType
}

export default function CartItem({ item }: CartItemProps) {

  const { handleRemoveFromCart, handleCartQtyIncrease, handleCartQtyDecrement } = useCart()

  return (
    <div>

    </div>
  )
}