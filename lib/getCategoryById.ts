import prisma from './prismadb';

interface IParams {
  id: string;
}

export default async function getCategoryById(params: IParams) {
  try {
    const { id } = params;

    const category = await prisma.category.findUnique({
      where: { id },
    })

    if (!category) return null;

    return category;
  } catch (error: any) {
    throw new Error(error);
  }
} 