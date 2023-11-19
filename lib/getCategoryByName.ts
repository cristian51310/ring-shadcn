import prisma from './prismadb';

interface IParams {
  name: string;
}

export default async function getCategoryByName(params: IParams) {
  try {
    const { name } = params;

    // Decodifica la cadena
    const decodedName = decodeURIComponent(name.replace(/-/g, ' '));

    console.log('decodedName', decodedName);

    const category = await prisma.category.findUnique({
      where: { name: decodedName },
    });

    if (!category) return null;

    return category;
  } catch (error: any) {
    throw new Error(error);
  }
}
