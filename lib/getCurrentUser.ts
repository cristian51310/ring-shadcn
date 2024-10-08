import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import prisma from "@/lib/prismadb"

export async function getSession(){
  return await getServerSession(authOptions)
}

export async function getCurrentUser(){
  try {
    const session = await getSession()

    if (!session?.user?.email) return null

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email
      },
      include: {
        restaurant: true
      }
    })

    if (!currentUser) return null

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toString() || null,
    }
  } catch (error: any){
    return null
  }
}


export async function getCurrentUserRole(){
  try {
    const session = await getSession()

    if (!session?.user?.email) return null

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email
      },
    })

    if (!currentUser) return null

    return {
      currentUserRole: currentUser.role
    }
  } catch (error: any){
    return null
  }
}