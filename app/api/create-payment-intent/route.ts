import { calculateOrderAmount } from "@/lib/calculateOrderAmount";
import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/prismadb";
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

  const orderData = {
    user: { connect: { id: user.id } },
    amount: total,
    currency: "mxn",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items
  }

  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)

    if (current_intent) {
      const update_intent = await stripe.paymentIntents.update(
        payment_intent_id, { amount: total }
      )

      // update the order
      const existing_order = await prisma.order.findFirst({
        where: { paymentIntentId: payment_intent_id }
      });
      
      if (existing_order) {
        await prisma.order.update({
          where: { paymentIntentId: payment_intent_id },
          data: {
            amount: total,
            products: items
          }
        });
      } else {
        return NextResponse.json(
          { error: "invalid payment intent" },
          { status: 400 }
        );
      }

      return NextResponse.json({ paymentIntent: update_intent })
    }
  } else {
    // create the intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "mxn",
      automatic_payment_methods: { enabled: true },
    })

    // create the order
    orderData.paymentIntentId = paymentIntent.id

    await prisma.order.create({
      data: orderData
    })

    return NextResponse.json({ paymentIntent })
  }
}