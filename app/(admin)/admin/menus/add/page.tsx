import { getCurrentUser } from "@/lib/getCurrentUser"
import AddMenuForm from "./add-form"
import NullData from "@/components/null-data"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default async function AddProductsPage() {
  const user = await getCurrentUser()

  if (!user || user.role !== "ADMIN") return <NullData title="Acceso Denegado" />

  if (user.role === "ADMIN" && !user.restaurantID) return (
    <NullData title="No tienes un restaurante creado">
      <p className="text-sm text-gray-300">
        Primero necesitas crear un restaurante para poder agregar menus
      </p>
      <Link
        href="/admin/restaurant/add"
        className={cn(buttonVariants({ variant: "default" }), "mt-8")}
      >
        Crear un restaurante
      </Link>
    </NullData>
  )

  return (
    <>
      <h1 className="text-xl font-bold mb-1">Agregar un nuevo menu</h1>
      <h3 className="mb-7">
        Aqui podras agregar un nuevo menu para tu restaurante
      </h3>
      <AddMenuForm user={user} />
    </>
  )
}