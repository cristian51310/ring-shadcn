"use client"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

interface ProductDetailProps {
  category: any
}

export default function CategoryDetail({ category }: ProductDetailProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

      <div className="grid grid-cols-6 grid-rows-4 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        <div className="col-span-5 relative aspect-square">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="w-full h-full object-cover max-h-[500px] min-h-[300px] sm:min-h-[400px] rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 text-sm">
        <h2 className="text-4xl font-bold">
          {category.name}
        </h2>

        <Separator className="my-4" />

        <p className="text-left leading-7 text-foreground">
          {category.description}
        </p>

        <Separator />


      </div>
    </div>
  )
}
