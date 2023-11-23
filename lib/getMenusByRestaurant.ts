import prisma from "./prismadb"

interface IParams {
  restaurantId: string | null
}

export default async function getMenusByRestaurant(params: IParams) {
  try {
    const { restaurantId } = params

    const menus = await prisma.menu.findMany({
      where: {
        restaurantId
      }
    })
    return menus
  } catch (err: any) {
    throw new Error(err)
  }
}