"use client"
import { formatPrice } from "@/lib/formatPrice"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card } from "../ui/card"

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any
}

export function ProductCard({ data, className }: ProductCardProps) {
  const router = useRouter()

  return (
    <Card
      onClick={() => router.push(`/product/${data.id}`)}
      className={cn("p-2 hover:cursor-pointer hover:shadow-xl", className)}
    >
      <div className="space-y-3">

        <div className="overflow-hidden rounded-md">
          <Image
            src={data.image}
            alt={data.name}
            height={150}
            width={150}
            className={cn(
              "h-auto w-full object-cover transition-all hover:scale-105 aspect-square"
            )}
          />
        </div>

        <div className="space-y-1 text-sm">
          <h3 className="font-medium text-base leading-none mb-2.5">{data.name}</h3>
          <div className="flex gap-2">
            <p className="text-xs line-through font-bold text-red-500">
              {formatPrice(data.price * 1.3)}
            </p>
            <p className="text-lg font-bold -mt-1 text-green-500">
              {formatPrice(data.price)}
            </p>
          </div>

        </div>
      </div>
    </Card>
  )
}