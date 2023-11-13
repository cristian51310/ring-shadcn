import Link from "next/link"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Search } from "../search"
import { UserNav } from "../navbar/user-nav"
import { TextAlignJustifyIcon } from "@radix-ui/react-icons"
import { ModeToggle } from "../mode-toggle"
import CartCount from "./cart-count"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { CartSheet } from "./cart-sheet"

export default async function MainNavbar() {
  const user = await getCurrentUser()

  return (
    <div className=" sticky top-0 z-30 border-b backdrop-blur-md bg-white/30 dark:bg-black/30">
      <div className="flex h-16 items-center px-12">
        <TextAlignJustifyIcon className="h-8 w-8 mr-4" />
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src="/logo.png" alt="@shadcn" />
          </Avatar>
          <p className="text-xl font-semibold">Ring!</p>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ModeToggle />
          <CartCount />
          <CartSheet />
          <UserNav user={user}/>
        </div>
      </div>
    </div>
  )
}