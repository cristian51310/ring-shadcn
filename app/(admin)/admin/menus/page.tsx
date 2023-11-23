import { buttonVariants } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/getCurrentUser"
import getMenusByRestaurant from "@/lib/getMenusByRestaurant"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { IoAddCircleOutline } from "react-icons/io5"
import { DataTableDemo } from "./manage-menus"

export default async function ManageCategoriesPage() {
  const user = await getCurrentUser()
  if (!user) return null

  const menus = await getMenusByRestaurant({ restaurantId: user.restaurantID })

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-4">Administrar Menus</h1>
        <Link
          className={cn(
            buttonVariants({ variant: "default" }),
            "justify-center items-center"
          )}
          href={"/admin/menus/add"}
        >
          <IoAddCircleOutline className="mr-2 w-4 h-4" />
          Agregar un menu
        </Link>
      </div>
      <DataTableDemo menus={menus} />
    </>
  )
}