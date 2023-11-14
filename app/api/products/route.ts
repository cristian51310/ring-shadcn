import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await getCurrentUser()

  if (!user || user.role !== "ADMIN") return NextResponse.error()

  const body = await request.json()
  const { name, description, price, category, inStock, images } = body

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      category,
      inStock,
      images
    }
  })

  return NextResponse.json(product)
}

export async function PUT(request: Request) {
  const user = await getCurrentUser()

  if (!user || user.role !== "ADMIN") return NextResponse.error()

  const body = await request.json()
  const { id, inStock } = body

  const product = await prisma.product.update({
    where: { id },
    data: { inStock}
  })

  return NextResponse.json(product)
}