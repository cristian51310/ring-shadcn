"use client"
import {
  Dialog, DialogContent,
  DialogDescription, DialogHeader,
  DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { IoLanguageOutline } from "react-icons/io5"

export default function LanguageToggle() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-1 mt-4 md:mt-0 rounded-md hover:gb-neutral-200 flex items-center gap-2">
          <IoLanguageOutline className="w-5 h-5" />
          Español
        </button>
      </DialogTrigger> 
      <DialogContent className="max-w-[425px] md:max-w-[425px] dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle>Lenguaje</DialogTitle>
          <DialogDescription>
            Cambia el lenguaje a tu preferencia
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex flex-col gap-3 mt-2">
          <Button>
            Español
          </Button>
          <Button>
            Ingles
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}