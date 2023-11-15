import DorichangosBanner from "@/components/banners/dorichangos-banner"
import HomeBanner from "@/components/banners/home-banner"
import OfertasBanner from "@/components/banners/ofertas-banner"
import { CategoryCard } from "@/components/categories/card-categry"
import NullData from "@/components/null-data"
import { ProductCard } from "@/components/products/product-card"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import getProducts, { IProductsParams } from "@/lib/getProducts"
import { cn } from "@/lib/utils"
import { categories } from "@/mocks/categories"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Ring! | Tu comida favorita en minutos",
  description: "Tu comida favorita en minutos",
}

interface HomeProps {
  searchParams: IProductsParams
}

export default async function DashboardPage({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams)

  if (products.length === 0) return (
    <NullData title="No hay productos que coincidan con la busqueda">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "text-xl p-9 px-14"
        )}
      >
        Limpiar filtros
      </Link>
    </NullData>
  )

  //fisher-yates suffle algorithm

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1)); // Corregir la generación del índice
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const shuffledProducts = shuffleArray(products)

  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-7 p-8 px-12 pt-6">
        <div className="relative">
          <ScrollArea>
            <div className="flex space-x-5 pb-3 justify-between">
              {categories.map((album) => (
                <CategoryCard
                  key={album.name}
                  album={album}
                  className="w-[110px]"
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <Separator />

        <div className="grid grid-cols-3 gap-6">
          <DorichangosBanner />
          <HomeBanner />
          <OfertasBanner />
        </div>

        <Separator />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {shuffledProducts.map((product) => (
            <ProductCard
              key={product.name}
              data={product}
            />
          ))}
        </div>
      </div>
    </div>
  )
}