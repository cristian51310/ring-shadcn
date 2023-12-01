"use client"
import {
  Dialog, DialogContent,
  DialogDescription, DialogHeader,
  DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import { Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "../ui/button"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-1 mt-4 md:mt-0 rounded-md hover:gb-neutral-200 flex items-center gap-2">
          <Moon className="w-5 h-5" />
          Tema
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] md:max-w-[425px] dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle>Tema</DialogTitle>
          <DialogDescription>
            Cambia el tema de la pagina a tu preferencia
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex flex-col gap-3 mt-2">
          <Button
            onClick={() => setTheme("light")}
            variant={theme === "light" ? "default" : "secondary"}
          >
            Modo claro
          </Button>
          <Button
            onClick={() => setTheme("dark")}
            variant={theme === "dark" ? "default" : "secondary"}
          >
            Modo oscuro
          </Button>
          <Button
            onClick={() => setTheme("system")}
            variant={theme === "system" ? "default" : "secondary"}
          >
            Modo automatico
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}