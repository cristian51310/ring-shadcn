import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE({ params }: { params: { id: string } }) {
  const user = await getCurrentUser()

  if (!user) return NextResponse.error()

  if (user.role !== "SUPERADMIN") return NextResponse.error()

  const product = await prisma.category.delete({
    where: { id: params.id }
  })

  return NextResponse.json(product)
}