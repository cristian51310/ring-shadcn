import prisma from "./prismadb";

interface IParams {
  id: string
}

export default async function getRestaurants({ id }: IParams) {
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        userIDs: {
          has: id
        }
      },
      include: {
        users: true,
      }
    })
    return restaurants
  } catch (err: any) {
    throw new Error(err)
  }
}