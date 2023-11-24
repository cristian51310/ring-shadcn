import DorichangosBanner from "@/components/banners/dorichangos-banner"
import HomeBanner from "@/components/banners/home-banner"
import OfertasBanner from "@/components/banners/ofertas-banner"
import { CategoryCard } from "@/components/categories/card-categry"
import NullData from "@/components/null-data"
import { ProductCard } from "@/components/products/product-card"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import getCategories from "@/lib/getCategories"
import getProducts from "@/lib/getProducts"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Ring! | Tu comida favorita en minutos",
  description: "Tu comida favorita en minutos",
}

export default async function Page() {
  const products = await getProducts()
  const categories = await getCategories()

  if (products.length === 0) return (
    <NullData title="No hay productos que coincidan con la busqueda">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "text-xl p-7 px-12 md:p-9 md:px-14"
        )}
      >
        Limpiar filtros
      </Link>
    </NullData>
  )

  //fisher-yates suffle algorithm
  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledProducts = shuffleArray(products)

  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-5 p-8 px-6 md:px-12 pt-6">
        <div className="relative">
          <ScrollArea>
            <div className="flex space-x-8 pb-4 justify-between">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  image={category.image}
                  href={`/categories/${category.name.replace(/\s+/g, '-')}`}
                  className="w-[80px] md:w-[100px]"
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <Separator />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <DorichangosBanner />
          <HomeBanner />
          <OfertasBanner />
        </div>

        <Separator />

        <p className="text-2xl font-bold">Productos cerca de mi</p>

        <div className="grid gap-3 md:gap-5 grid-cols-2 lg:grid-cols-5">
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
