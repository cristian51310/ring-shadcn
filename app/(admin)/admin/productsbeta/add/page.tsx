import NullData from "@/components/null-data"
import { buttonVariants } from "@/components/ui/button"
import getCategories from "@/lib/getCategories"
import { getCurrentUser } from "@/lib/getCurrentUser"
import getMenus from "@/lib/getMenus"
import { cn } from "@/lib/utils"
import Link from "next/link"
import AddProductForm from "./add-form"

export default async function AddProductsPage() {
  const categories = await getCategories()
  const menus = await getMenus()
  const user = await getCurrentUser()

  if (!user || user.role !== "ADMIN") return <NullData title="Acceso Denegado" />

  if (user.role === "ADMIN" && !user.restaurantID) return (
    <NullData title="No tienes un restaurante creado">
      <p className="text-sm text-gray-300">
        Primero necesitas crear un restaurante para poder agregar productos
      </p>
      <Link
        href="/admin/restaurant/manage"
        className={cn(buttonVariants({ variant: "default" }), "mt-8")}
      >
        Crear un restaurante
      </Link>
    </NullData>
  )

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Agregar producto</h1>
      <AddProductForm
        categories={categories}
        menus={menus}
      />
    </>
  )
}