import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await getCurrentUser()

  if (!user) return NextResponse.error()

  if (user.role !== "ADMIN") return NextResponse.error()

  const body = await request.json()
  const { id } = body

  const product = await prisma.category.delete({
    where: { id }
  })

  return NextResponse.json(product)
}