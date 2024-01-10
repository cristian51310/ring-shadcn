import { getCurrentUser } from "@/lib/getCurrentUser"
import ManageRestaurantForm from "./add-restaurant"
import NullData from "@/components/null-data"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export default async function ManageRestaurant() {
  const user = await getCurrentUser()

  if (user?.restaurantID) return (
    <NullData title="No tienes un restaurante creado">
      <p className="text-sm dark:text-gray-300 text-gray-600">
        Ya tienes un restaurante, no puedes crear otro
      </p>
      <Link
        href="/admin/restaurant"
        className={cn(buttonVariants({ variant: "default" }), "mt-8")}
      >
        Administra tu restaurante
      </Link>
    </NullData>
  )

  return (
    <div className="md:mx-20 lg:mx-28 xl:mx-32">
      <h1 className="text-xl font-bold mb-4">Datos de mi restaurante</h1>
      <ManageRestaurantForm user={user} />
    </div>
  )
}
