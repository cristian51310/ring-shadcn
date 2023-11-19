import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

interface CategoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  description?: string
  image: string
  href: string
}

export function CategoryCard({ name, description, image, href, className }: CategoryCardProps) {
  return (
    <Link href={href} className={cn("space-y-2 hover:cursor-pointer", className)}>
      <div className="overflow-hidden rounded-full">
        <Image
          src={image}
          alt={name}
          width={130}
          height={130}
          className="h-auto w-auto object-cover transition-all hover:scale-110 aspect-square"
        />
      </div>

      <h3 className="font-medium text-sm text-center leading-none">{name}</h3>
    </Link>
  )
}