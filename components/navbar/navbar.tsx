
import { getCurrentUser } from "@/lib/getCurrentUser"
import { CartSheet } from "./cart-sheet"
import { FavouritesSheet } from "./favourites-sheet"
import { UserMenu } from "./user-menu"

export default async function Navbar() {
  const user = await getCurrentUser()

  return (
    <div className="border-b bg-orange-400 dark:bg-black/30">
      <div className="flex h-16 items-center justify-between px-6 md:px-12">

        <div></div>

        <div className="flex items-center gap-4">
          <CartSheet />
          <FavouritesSheet />
          <UserMenu user={user} />
        </div>

      </div>
    </div>
  )
}