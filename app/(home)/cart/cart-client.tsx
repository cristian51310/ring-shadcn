"use client"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/lib/formatPrice"
import { SafeUser } from "@/types"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MdArrowBack } from "react-icons/md"
import CartItem from "./cart-item"

interface CartClientProps {
  user: SafeUser | null
}

export default function CartClient({ user }: CartClientProps) {
  const router = useRouter()
  const { cartProducts, cartTotalAmount, handleClearCart } = useCart()

  if (!cartProducts || cartProducts.length === 0) return (
    <div className="flex flex-col items-center p-8 gap-3">
      <p className="text-3xl font-bold">Tu carrito esta vacio</p>

      <Link href="/" className="flex items-center gap-2">
        <MdArrowBack />
        <span>Vamos a comprar</span>
      </Link>
    </div>
  )

  return (
    <div className="md:p-12 p-8 ">

      <h1 className="text-xl font-bold mb-4">Carrito de compras</h1>

      <div className="grid grid-cols-5 text-xs gap-4 pb-3 items-center mt-10">
        <div className="col-span-2 justify-self-start">Producto</div>
        <div className="justify-self-center">Precio</div>
        <div className="justify-self-center">Cantidad</div>
        <div className="justify-self-end">Total</div>
      </div>
      <div>
        {cartProducts.map((product) => (
          <CartItem key={product.id} item={product} />
        ))}
      </div>
      <div className=" border-t border-slate-200 py-4 flex justify-between gap-4">
        <div className="max-w-[200px]">
          <Button
            onClick={() => handleClearCart()}
            size={"sm"}
            variant={"outline"}
          >
            Limpiar Carrito
          </Button>
        </div>
        <div className="flex flex-col gap-1 text-sm items-start">
          <div className="flex justify-between w-full text-base font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p>Tarifas e impuestos se calculan en el checkout</p>
          <Button
            variant={!user ? "outline" : "secondary"}
            onClick={() => {
              if (user) router.push("/checkout")
              else router.push("/login")
            }}
          >
            {user ? "Proceder al pago" : "Inicia sesion para continuar"}
          </Button>

          <Link
            href="/"
            className="flex items-center gap-2 mt-3"
          >
            <MdArrowBack />
            <span>Continuar Comprando</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
