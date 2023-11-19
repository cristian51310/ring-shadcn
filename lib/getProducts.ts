import prisma from "@/lib/prismadb"

export interface IProductsParams {
  category?: string | null
  search?: string | null
}

export default async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { inStock: true },
    })
    return products
  } catch (err: any) {
    throw new Error(err)
  }
}