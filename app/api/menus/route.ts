import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await getCurrentUser()

  if (!user || user.role !== "ADMIN") return NextResponse.error()

  const body = await request.json()
  const { name, description, image, restaurantId } = body

  const menu = await prisma.menu.create({
    data: {
      name,
      description,
      image,
      restaurant: {
        connect: { id: restaurantId }
      },
    }
  })

  return NextResponse.json(menu)
}
