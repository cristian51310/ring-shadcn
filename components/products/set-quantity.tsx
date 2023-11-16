"use client"

import { CartProductType } from "@/types/cart-pruduct-type"
import { Button } from "../ui/button"
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"

interface SetQuantityProps {
  cartCounter?: boolean
  cartProduct: CartProductType
  handleQtyIncrement: () => void
  handleQtyDecrement: () => void
}

const SetQuantity: React.FC<SetQuantityProps> = ({
  cartCounter,
  cartProduct,
  handleQtyIncrement,
  handleQtyDecrement,
}) => {
  return(
    <div className="flex gap-8 items-center">
      {cartCounter ? null : (
        <div className="font-semibold">
          Cantidad: 
        </div>
      )}
      <div className="flex justify-center items-center border rounded-md">
        <Button onClick={handleQtyDecrement} variant="link" size="sm">
          <MinusIcon />
        </Button>
        <p className="mx-1 w-6 text-center">
          {cartProduct.quantity}
        </p>
        <Button onClick={handleQtyIncrement} variant="link" size="sm">
          <PlusIcon />
        </Button>
      </div>
    </div>
  )
}

export default SetQuantity