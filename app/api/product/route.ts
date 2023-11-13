import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function POST(request: Request){
  const user = await getCurrentUser()
  
  if(!user || user.role !== "ADMIN") return NextResponse.error()

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