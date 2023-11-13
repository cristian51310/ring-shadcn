"use client"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "@/components/ui/context-menu"
import { formatPrice } from "@/lib/formatPrice"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card } from "../ui/card"

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any
}

export function ProductCard({
  data,
  className
}: ProductCardProps) {
  const router = useRouter()

  return (
    <Card
      onClick={() => router.push(`/product/${data.id}`)}
      className={cn("p-2 hover:cursor-pointer hover:shadow-xl", className)}
    >
      <div className="space-y-3">
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="overflow-hidden rounded-md">
              <Image
                src={data.images[0].url}
                alt={data.name}
                height={150}
                width={150}
                className={cn(
                  "h-auto w-full object-cover transition-all hover:scale-105 aspect-video"
                )}
              />
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-40">
            <ContextMenuItem>Like</ContextMenuItem>
            <ContextMenuItem>Share</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <div className="space-y-1 text-sm">
          <h3 className="font-medium text-sm leading-none">{data.name}</h3>
          <p className="text-lg text-muted-foreground">
            {formatPrice(data.price)}
          </p>
        </div>
      </div>
    </Card>
  )
}