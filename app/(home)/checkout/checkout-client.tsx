"use client"
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import CheckoutForm from "./checkout-form";
import axios from "axios";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

export default function CheckoutClient() {
  const router = useRouter()

  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [clientSecret, setClientSecret] = useState("")
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  // create a payment intent as soon as the page loads
  useEffect(() => {
    if (cartProducts) {
      setLoading(true)
      setError(false)

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent
        })
      })
        .then(res => {
          setLoading(false)
          if (res.status === 401) return router.push("/login")
          return res.json()
        })
        .then(data => {
          console.log(data)
          setClientSecret(data.paymentIntent.client_secret)
          handleSetPaymentIntent(data.paymentIntent.id)
        })
        .catch(err => {
          setError(true)
          toast.error("Algo salio mal")
        })
    }
  }, [cartProducts, paymentIntent, handleSetPaymentIntent, router])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "flat",
      labels: "floating"
    }
  }

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value)

    //if the payment is successful, we need update in database with axios
    axios.put("/api/orders/payment", {
      payment_intent_id: paymentIntent,
      payment_intent_status: "succeeded"
    }).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [paymentIntent])

  return (
    <div className="w-full">
      {clientSecret && cartProducts && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}
      {loading && <p className="text-2xl text-center">Cargando...</p>}
      {error && <p className="text-2xl text-center text-red-600">Algo salio mal</p>}
      {paymentSuccess && (
        <div className="flex flex-col items-center gap-3">
          <div>
            <p className="text-3xl text-center mb-3">Pago exitoso</p>
            <p className="text-2xl text-center">Gracias por tu compra</p>
          </div>
          <Button onClick={() => router.push("/order")}>
            Ver mis ordenes
          </Button>
        </div>
      )}
    </div>
  )
}
