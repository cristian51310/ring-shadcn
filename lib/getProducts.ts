import prisma from "@/lib/prismadb"

export interface IProductsParams {
  category?: string | null
  search?: string | null
}

export default async function getProducts(params: IProductsParams) {
  try {
    const { category, search } = params

    let searchStr = search

    if (!search) { searchStr = "" }

    let query: any = {}

    if (category) {query.category = category}

    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [{
          name: {
            contains: searchStr,
            mode: "insensitive"
          },
          description: {
            contains: searchStr,
            mode: "insensitive"
          }
        }]
      },
    })

    return products
  } catch (err: any) {
    throw new Error(err)
  }
}