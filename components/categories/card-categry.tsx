import { cn } from "@/lib/utils"
import Image from "next/image"

import { Category } from "@/mocks/categories"

interface CategoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Category
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function CategoryCard({
  album,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: CategoryCardProps) {
  return (

    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-full">
        <Image
          src={album.cover}
          alt={album.name}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-110",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>

      <div className="space-y-1 text-sm">
        <h3 className="font-medium text-center leading-none">{album.name}</h3>
      </div>
    </div>
  )
}