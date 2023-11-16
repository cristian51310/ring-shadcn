import { getCurrentUser } from "@/lib/getCurrentUser"
import { TextAlignJustifyIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { ModeToggle } from "../mode-toggle"
import { UserNav } from "../navbar/user-nav"
import { Search } from "../search"
import { Avatar, AvatarImage } from "../ui/avatar"
import { CartSheet } from "./cart-sheet"
import Categories from "./categories"

export default async function MainNavbar() {
  const user = await getCurrentUser()

  return (
    <div className="sticky top-0 z-30 border-b backdrop-blur-md bg-white/30 dark:bg-black/30">
      <div className="flex h-16 items-center px-6 md:px-12">
        <TextAlignJustifyIcon className="h-8 w-8 mr-4" />
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="/logo.png" alt="@shadcn" />
          </Avatar>
          <p className="hidden md:block text-xl font-semibold">Ring!</p>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <div className="hidden md:block">
            <Search />
          </div>
          <ModeToggle />
          <CartSheet />
          <UserNav user={user} />
        </div>
      </div>
      <Categories />
    </div>
  )
}