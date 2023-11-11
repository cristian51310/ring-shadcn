import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "@/components/ui/context-menu"
import { cn } from "@/lib/utils"
import Image from "next/image"

import { Category } from "@/mocks/categories"
import { Card } from "../ui/card"

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Category
  width?: number
  height?: number
}

export function ProductCard({
  album,
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
  return (
    <Card className={cn("p-2 hover:cursor-pointer hover:shadow-xl", className)} {...props}>
      <div className="space-y-3">
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="overflow-hidden rounded-md">
              <Image
                src={album.cover}
                alt={album.name}
                width={width}
                height={height}
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
          <h3 className="font-medium leading-none">{album.name}</h3>
          <p className="text-xs text-muted-foreground">{album.name}</p>
        </div>
      </div>
    </Card>

  )
}