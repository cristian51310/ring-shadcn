import {
  Menubar, MenubarContent,
  MenubarItem, MenubarLabel, MenubarMenu,
  MenubarRadioGroup, MenubarRadioItem, MenubarSeparator,
  MenubarSub, MenubarSubContent, MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { IoNotificationsOutline } from "react-icons/io5"
import { ModeToggle } from "../mode-toggle"
import { buttonVariants } from "../ui/button"

export function Menu() {
  return (
    <Menubar className="rounded-none border-b border-none px-2 lg:px-4 py-7 justify-between">

      <div className="flex items-center">
        <MenubarMenu>
          <MenubarTrigger className="font-bold flex justify-center items-center gap-2">
            <Image
              src={"/logo.png"}
              alt="Ring Logo"
              width={30}
              height={30}
            />
            Dashboard Ring!
          </MenubarTrigger>

          <MenubarContent>
            <MenubarItem>Configuracion</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="relative">File</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>New</MenubarSubTrigger>
              <MenubarSubContent className="w-[230px]">
                <MenubarItem>Playlist</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="hidden md:block">Cuenta</MenubarTrigger>
          <MenubarContent forceMount>
            <MenubarLabel inset>Cambiar Cuenta</MenubarLabel>
            <MenubarSeparator />

            <MenubarRadioGroup value="benoit">
              <MenubarRadioItem value="andy">Cristian Ruben</MenubarRadioItem>
              <MenubarRadioItem value="benoit">Rodrigo Vazques</MenubarRadioItem>
            </MenubarRadioGroup>

            <MenubarSeparator />
            <MenubarItem inset>Añadir cuenta.</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </div>

      <div className="flex items-center gap-3">
        <ModeToggle />

        <Link
          href="/admin/notifications"
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
          )}
        >
          <IoNotificationsOutline className="text-xl" />
        </Link>
      </div>

    </Menubar>
  )
}