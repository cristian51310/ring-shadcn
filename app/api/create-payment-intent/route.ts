import { calculateOrderAmount } from "@/lib/calculateOrderAmount";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2023-10-16" })

export async function POST(request: Request) {
  const user = await getCurrentUser()

  if (!user) return NextResponse.json(
    { error: "No autorizado" },
    { status: 401 }
  )

  const body = await request.json()

  const { items, payment_intent_id } = body

  const total = calculateOrderAmount(items) * 100

  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    )

    if (current_intent) {
      if (current_intent.status === "succeeded") {
        return NextResponse.json(
          { error: "Este pago ya se realizo" },
          { status: 400 }
        )
      }

      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total }
      )

      return NextResponse.json({ paymentIntent: updated_intent })
    }
  } else {

    if (total === 0) {
      return NextResponse.json(
        { error: "El total de la orden no puede ser 0" },
        { status: 400 }
      )
    }

    if (!user.email) {
      return NextResponse.json(
        { error: "El usuario no tiene un correo electronico" },
        { status: 400 }
      )
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "mxn",
      receipt_email: user.email,
      automatic_payment_methods: { enabled: true },
    })

    return NextResponse.json({ paymentIntent })
  }
}