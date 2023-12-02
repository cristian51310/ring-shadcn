"use client"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader, SheetTitle, SheetTrigger
} from "@/components/ui/sheet"
import { Heart } from "lucide-react"

export function FavouritesSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="text-muted-foreground flex items-center justify-center">
          <Heart size={20} className="text-lg" />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full md:max-w-lg dark:bg-zinc-900">
        <SheetHeader>
          <SheetTitle>Mis favoritos</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet >
  )
}
