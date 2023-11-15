import prisma from "./prismadb"

interface IParams {
  id?: string
}

export default async function getOrderById(params: IParams) {
  try {
    const { id } = params
    const order = await prisma.order.findUnique({
      where: { id }
    })

    if (!order) return null
    return order

  } catch (err: any) {
    throw new Error(err)
  }
}