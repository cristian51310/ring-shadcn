import { CartProductType } from '@/types/cart-pruduct-type';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from "sonner";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddToCart: (product: CartProductType) => void;
  handleRemoveFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrement: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (val: string | null) => void;
}

interface Props {
  [propName: string]: any;
}

export const CartContext = createContext<CartContextType | null>(null)

export const CartContextProvider = (props: Props) => {
  const [cartTotalAmount, setCartTotalAmount] = useState(0)
  const [cartTotalQty, setCartTotalQty] = useState(0)
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)

  const [paymentIntent, setPaymentIntent] = useState<string | null>(null)

  useEffect(() => {
    const cartItems: any = localStorage.getItem('cart')
    const cProducts: CartProductType[] = JSON.parse(cartItems)

    const ringPaymentIntent: any = localStorage.getItem('ringPaymentIntent')
    const paymentIntent: string | null = JSON.parse(ringPaymentIntent)

    setCartProducts(cProducts)
    setPaymentIntent(paymentIntent)
  }, [])

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce((acc, item) => {
          const itemTotal = item.price * item.quantity
          acc.total += itemTotal
          acc.qty += item.quantity

          return acc
        }, {
          total: 0,
          qty: 0
        })

        setCartTotalQty(qty)
        setCartTotalAmount(total)
      }
    }
    getTotals()
  }, [cartProducts])

  const handleAddToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart

      if (prev) {
        updatedCart = [...prev, product]
      } else {
        updatedCart = [product]
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return updatedCart
    })
  }, [])

  const handleRemoveFromCart = useCallback((product: CartProductType) => {
    if (cartProducts) {
      const filteredProducts = cartProducts.filter(item => item.id !== product.id)
      setCartProducts(filteredProducts)
      localStorage.setItem('cart', JSON.stringify(filteredProducts))
    }
  }, [cartProducts])

  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart

      if (product.quantity === 5) {
        return toast.error('No puedes agregar más de 5 productos')
      }

      if (cartProducts) {
        updatedCart = [...cartProducts]

        const existingIndex = cartProducts.findIndex(item => item.id === product.id)
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity++
        }

        setCartProducts(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
      }
    }, [cartProducts]
  )

  const handleCartQtyDecrement = useCallback(
    (product: CartProductType) => {
      let updatedCart

      if (product.quantity === 1) {
        return toast.error('Ya no puedes quitar mas')
      }

      if (cartProducts) {
        updatedCart = [...cartProducts]

        const existingIndex = cartProducts.findIndex(item => item.id === product.id)
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity--
        }

        setCartProducts(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
      }
    }, [cartProducts]
  )

  const handleClearCart = useCallback(() => {
    setCartProducts(null)
    setCartTotalQty(0)
    localStorage.removeItem('cart')
  }, [])

  const handleSetPaymentIntent = useCallback(
    (val: string | null) => {
      setPaymentIntent(val)
      localStorage.setItem("ringPaymentIntent", JSON.stringify(val))
    }, []
  )

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddToCart,
    handleRemoveFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrement,
    handleClearCart,
    paymentIntent,
    handleSetPaymentIntent
  }

  return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context || context === null) {
    throw new Error('useCart debe estar dentro del proveedor CartContext')
  }

  return context
}