import { getCurrentUser } from "@/lib/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/lib/prismadb"

export async function PUT(request: Request) {
  const user = await getCurrentUser()

  if(!user) return NextResponse.error()

  if (user.role !== "ADMIN") return NextResponse.error()

  const body = await request.json()
  const { id, deliveryStatus } = body

  const order = await prisma.order.update({
    where: { id },
    data: { deliveryStatus}
  })

  return NextResponse.json(order)
}