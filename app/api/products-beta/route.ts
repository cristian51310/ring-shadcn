import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await getCurrentUser()

  if (!user || user.role !== "ADMIN") return NextResponse.error()

  const body = await request.json()
  const {
    name,
    description,
    price,
    image,
    inStock,
    menuId,
    category,
    sizes,
    flavors
  } = body

  const product = await prisma.productBeta.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      inStock,
      image,
      menu: {
        connect: {
          id: menuId
        }
      },
      categories: {
        connect: category.map((id: any) => ({ id })) //posible tipo de dato incorrecto
      },
      sizes: sizes.map((size: any) => ({
        name: size.name,
        price: parseFloat(size.price),
        description: size.description,
      })),
      flavors: flavors.map((flavor: any) => ({
        name: flavor.name,
        description: flavor.description,
      })),
    }
  })

  return NextResponse.json(product)
}

export async function PUT(request: Request) {
  const user = await getCurrentUser()

  if (!user) return NextResponse.error()

  if (user.role !== "ADMIN") return NextResponse.error()

  const body = await request.json()
  const { id, inStock } = body

  const product = await prisma.product.update({
    where: { id },
    data: { inStock }
  })

  return NextResponse.json(product)
}