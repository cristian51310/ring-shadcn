import { CartProductType } from "@/types/cart-pruduct-type"

export const calculateOrderAmount = (items: CartProductType[]) => {
  const total = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity
    return acc + itemTotal
  }, 0)

  const price: any = Math.floor(total)
  return price
}