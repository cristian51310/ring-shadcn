import { getCurrentUser } from "@/lib/getCurrentUser"
import Link from "next/link"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Search } from "./search"

export default async function Header() {
  const user = await getCurrentUser()

  return (
    <div className="border-b backdrop-blur-md bg-white dark:bg-black/30">
      <div className="flex h-16 items-center px-6 md:px-12">
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
        </div>
      </div>
    </div>
  )
}