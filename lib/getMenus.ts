import prisma from "./prismadb"

export default async function getMenus() {
  try {
    const menus = await prisma.menu.findMany()
    return menus
  } catch (err: any) {
    throw new Error(err)
  }
}