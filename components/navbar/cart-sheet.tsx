"use client"
import { Button } from "@/components/ui/button"
import {
  Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger
} from "@/components/ui/sheet"
import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/lib/formatPrice"
import { truncateText } from "@/lib/truncateText"
import Image from "next/image"
import Link from "next/link"
import { HiOutlineShoppingCart } from "react-icons/hi2"
import SetQuantity from "../products/set-quantity"
import { Card } from "../ui/card"

export function CartSheet() {
  const { cartProducts, cartTotalQty, handleClearCart, handleCartQtyDecrement, handleCartQtyIncrease } = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="text-muted-foreground">
          <HiOutlineShoppingCart className="text-lg md:mr-1.5 text-white" />
          {(!cartProducts || cartProducts.length === 0) ? (
            <p className="hidden md:block">0 Productos</p>
          ) : (
            <p className="hidden md:block">{cartTotalQty} Productos</p>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[300px] md:w-[400px] dark:bg-zinc-900">
        <SheetHeader>
          <SheetTitle>Carrito de compras</SheetTitle>
          <SheetDescription>
            <SheetClose>
              <Link href="/cart" className="underline">
                Ver el carrito en pantalla completa
              </Link>
            </SheetClose>
          </SheetDescription>
        </SheetHeader>

        {(!cartProducts || cartProducts.length === 0) ? (
          <p className="mt-8">No hay productos actualmente</p>
        ) : (
          <>
            <div className="grid gap-4 py-4">
              {cartProducts.map((product) => (
                <Card key={product.id} className="p-3 flex gap-3">
                  <div className="relative w-[90px] aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-md w-20 h-20"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <p>{truncateText(product.name)}</p>
                      <p className="font-bold text-sm">{formatPrice(product.price)}</p>
                    </div>

                    <div>
                      <SetQuantity
                        cartCounter
                        cartProduct={product}
                        handleQtyDecrement={() => handleCartQtyDecrement(product)}
                        handleQtyIncrement={() => handleCartQtyIncrease(product)}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <SheetClose asChild>
              <Link href="/checkout">
                <Button>
                  Continuar con el pago
                </Button>
              </Link>
            </SheetClose>
          </>
        )}


      </SheetContent>
    </Sheet >
  )
}
