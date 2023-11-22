import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await getCurrentUser()

  if (!user || user.role !== "ADMIN") return NextResponse.error()

  const body = await request.json()
  const { name, description, logo, cover, street, city, zip, exteriorNumber, interiorNumber, neighborhood, state, email, phone, userID } = body

  const restaurant = await prisma.restaurant.create({
    data: {
      name,
      description,
      logo,
      cover,
      street,
      city,
      zip,
      exteriorNumber,
      interiorNumber,
      neighborhood,
      state,
      email,
      phone,
      users: {
        connect: [
          { id: userID }
        ]
      }
    },
    include: {
      users: true
    }
  })

  return NextResponse.json(restaurant)
}
