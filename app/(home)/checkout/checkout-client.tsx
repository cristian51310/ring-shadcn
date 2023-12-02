"use client"
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import CheckoutForm from "./checkout-form";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

export default function CheckoutClient() {
  const router = useRouter()

  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [clientSecret, setClientSecret] = useState<string>("")
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false)

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
  }, [])

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

      {loading && (
        <div className="min-h-[40vh]">
          <p className="text-2xl text-center">Cargando...</p>
        </div>
      )}
      {error && (
        <div className="min-h-[40vh]">
          <p className="text-2xl text-center text-red-600">Algo salio mal</p>
        </div>
      )}
      {paymentSuccess && (
        <div className="flex flex-col items-center justify-center gap-3 min-h-[60vh]">
          <div>
            <p className="text-5xl font-bold text-center mb-3">Pago exitoso</p>
            <p className="text-xl text-center text-neutral-800 my-4">Gracias por tu compra</p>
          </div>
          <Button onClick={() => router.push("/orders")}>
            Ver mis ordenes
            <ArrowRight className="ml-2" size={24} />
          </Button>
        </div>
      )}
    </div>
  )
}
