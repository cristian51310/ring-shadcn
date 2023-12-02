import { calculateOrderAmount } from "@/lib/calculateOrderAmount"
import { getCurrentUser } from "@/lib/getCurrentUser"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const user = await getCurrentUser()

  if (!user) return NextResponse.error()

  const body = await request.json()

  const { products, payment_intent_id } = body

  const amount = calculateOrderAmount(products) * 100

  const order = await prisma.order.create({
    data: {
      user: {
        connect: { id: user.id }
      },
      amount: amount,
      currency: "mxn",
      deliveryStatus: "pending",
      status: "success",
      paymentIntentId: payment_intent_id,
      products: products
    }
  })

  return NextResponse.json(order)
}

export async function PUT(request: Request) {
  const user = await getCurrentUser()

  if (!user) return NextResponse.error()

  if (user.role !== "ADMIN") return NextResponse.error()

  const body = await request.json()
  const { id, deliveryStatus } = body

  const order = await prisma.order.update({
    where: { id },
    data: { deliveryStatus }
  })

  return NextResponse.json(order)
}