import DorichangosBanner from "@/components/banners/dorichangos-banner"
import HomeBanner from "@/components/banners/home-banner"
import { CategoryCard } from "@/components/categories/card-categry"
import { ProductCard } from "@/components/products/product-card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { categories } from "@/mocks/categories"
import { products } from "@/mocks/products"
import { Metadata } from "next"
import OfertasBanner from "@/components/banners/ofertas-banner"

export const metadata: Metadata = {
  title: "Ring! | Tu comida favorita en minutos",
  description: "Tu comida favorita en minutos",
}

export default function DashboardPage() {
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
          {products.map((product) => (
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