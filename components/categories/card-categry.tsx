import { cn } from "@/lib/utils"
import Image from "next/image"

import { Category } from "@/mocks/categories"

interface CategoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Category
}

export function CategoryCard({
  album,
  className,
  ...props
}: CategoryCardProps) {
  return (

    <div className={cn("space-y-3 hover:cursor-pointer", className)} {...props}>
      <div className="overflow-hidden rounded-full">
        <Image
          src={album.cover}
          alt={album.name}
          width={150}
          height={150}
          loading="lazy"
          layout="responsive"
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-110 aspect-square"
          )}
        />
      </div>

      <div className="space-y-1 text-sm">
        <h3 className="font-medium text-center leading-none">{album.name}</h3>
      </div>
    </div>
  )
}