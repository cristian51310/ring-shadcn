import { getCurrentUser } from "@/lib/getCurrentUser"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
  const user = await getCurrentUser()

  if (!user) return NextResponse.error()

  const body = await request.json()
  const { payment_intent_id, payment_intent_status } = body

  const order = await prisma.order.update({
    where: { paymentIntentId: payment_intent_id },
    data: { status: payment_intent_status }
  })

  return NextResponse.json(order)
}