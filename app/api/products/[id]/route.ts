import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE({ params }: { params: { id: string } }) {
  const user = await getCurrentUser()

  if (!user) return NextResponse.error()

  if (user.role !== "ADMIN") return NextResponse.error()

  const product = await prisma.product.delete({
    where: { id: params.id }
  })

  return NextResponse.json(product)
}