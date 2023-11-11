import { CategoryCard } from "@/components/categories/card-categry"
import HomeBanner from "@/components/home-banner"
import MainNavbar from "@/components/navbar/main-nav"
import { ProductCard } from "@/components/products/product-card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { categories } from "@/mocks/categories"
import { Metadata } from "next"

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
                  aspectRatio="square"
                  width={150}
                  height={150}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <Separator />

        <HomeBanner />

        <Separator />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {categories.map((product) => (
            <ProductCard
              key={product.name}
              album={product}
              width={150}
              height={150}
            />
          ))}
        </div>
      </div>
    </div>
  )
}