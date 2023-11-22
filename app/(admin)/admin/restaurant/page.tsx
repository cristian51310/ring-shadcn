import NullData from "@/components/null-data"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default async function Page() {
  const user = await getCurrentUser()

  console.log("user", user)

  if (!user || user.role !== "ADMIN") return <NullData title="Acceso Denegado" />

  if (user.role === "ADMIN" && !user.restaurantID) return (
    <NullData title="No tienes un restaurante creado">
      <p className="text-sm dark:text-gray-300 text-gray-600">
        Ya que eres administrador, necesitas crear un restaurante para poder administrarlo
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
      <h1 className="text-xl font-bold mb-4">Administrar mi Restaurante</h1>
      <h1 className="text-lg font-semibold mb-4">Aqui podra encontrar los datos del restaurante</h1>

      <div className="grid grid-cols-4 gap-5">
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">Logo</h3>
            <Image
              src={user.restaurant?.logo || "/images/placeholder.png"}
              alt={user.restaurant?.name || "Logo"}
              width={200}
              height={200}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">Logo</h3>
            <Image
              src={user.restaurant?.cover || "/images/placeholder.png"}
              alt={user.restaurant?.name || "Cover"}
              width={200}
              height={200}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">Nombre</h3>
            <p>{user.restaurant?.name}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">Descripcion</h3>
            <p>{user.restaurant?.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">Direccion</h3>
            <p>{user.restaurant?.state}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">Telefono</h3>
            <p>{user.restaurant?.phone}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">Correo</h3>
            <p>{user.restaurant?.email}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">Vecindario</h3>
            <p>{user.restaurant?.neighborhood}</p>
          </CardContent>
        </Card>

      </div>

    </>
  )
}