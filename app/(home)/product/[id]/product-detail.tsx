"use client"

import ProductImage from "@/components/products/product-image"
import SetQuantity from "@/components/products/set-quantity"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/useCart"
import { CartProductType, SelectedImgType } from "@/types/cart-pruduct-type"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { MdCheckCircle } from "react-icons/md"
import { toast } from "sonner"

interface ProductDetailProps {
  product: any
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const router = useRouter()
  const { cartTotalQty, cartProducts, handleAddToCart } = useCart()
  const [isProductInCart, setIsProductInCart] = useState<Boolean>(false)

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    selectedImage: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  })

  useEffect(() => {
    setIsProductInCart(false)
    if (cartProducts) {
      const existingId = cartProducts.findIndex(item => item.id === product.id)
      if (existingId > -1) { setIsProductInCart(true) }
    }
  }, [cartProducts, product.id])

  const handleImageSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImage: value }
      })
    }, []
  )

  const handleQtyIncrement = useCallback(() => {
    if (cartProduct.quantity === 5) return
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 }
    })
  }, [cartProduct])

  const handleQtyDecrement = useCallback(() => {
    if (cartProduct.quantity === 1) return
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 }
    })
  }, [cartProduct])

  console.log(isProductInCart)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleImageSelect={handleImageSelect}
      />

      <div className="flex flex-col gap-1 text-sm">
        <h2 className="text-4xl font-bold">
          {product.name}
        </h2>

        <Separator className="my-4" />

        <p className="text-left leading-7 text-foreground">
          {product.description}
        </p>

        <Separator />

        {isProductInCart ? (
          <>
            <p className="my-4 text-slate-500 flex items-center gap-3">
              <MdCheckCircle size={20} className="text-green-500" />
              Producto añadido a tu carrito
            </p>

            <Separator />

            <Button
              className="my-2"
              variant={"outline"}
              onClick={() => router.push('/cart')}
            >
              Ir al carrito
            </Button>
          </>
        ) : (
          <>
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyIncrement={handleQtyIncrement}
              handleQtyDecrement={handleQtyDecrement}
            />
            <Separator />

            <Button
              className="my-2"
              disabled={product.inStock === false}
              onClick={() => {
                handleAddToCart(cartProduct)
                toast.success('Producto añadido al carrito')
              }}
            >
              Agregar al carrito
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductDetail