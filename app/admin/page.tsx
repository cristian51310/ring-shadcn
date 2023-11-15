import { Metadata } from "next"
import { getCurrentUser } from "@/lib/getCurrentUser"
import NullData from "@/components/null-data"

export const metadata: Metadata = {
  title: "Administrador | Ring!",
  description: "Administrador de Ring!",
}

export default async function MainPage() {
  const user = await getCurrentUser()

  if (!user || user.role !== "ADMIN") return <NullData title="Acceso Denegado" />

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Resumen de mi negocio</h1>
    </>
  )
}