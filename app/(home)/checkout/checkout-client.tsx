import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";

const stripePromise = loadStripe("pk_test_51N31fdCCkGcV1au1Btx4fQMj7LJCjaLfOw021TjxoZovvyNKuZQ3Wjos1wfGL0yCYomsbgYQdj2wD6OxsXkt4wx000mNqtXjCx")

export default function CheckoutClient() {
  const router = useRouter()

  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [clientSecret, setClientSecret] = useState("")
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false)

  // create a payment intent as soon as the page loads

  return(
    <div>

    </div>
  )
}