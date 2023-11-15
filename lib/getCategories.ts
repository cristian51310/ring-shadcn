import prisma from "@/lib/prismadb"

export default async function getCategories() {
  try {
    const orders = await prisma.category.findMany()

    return orders
  } catch (err: any) {
    throw new Error(err)
  }
}