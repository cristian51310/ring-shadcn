import { getCurrentUser } from "@/lib/getCurrentUser"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Administrador | Ring!",
  description: "Administrador de Ring!",
}

export default async function MainPage() {
  const user = await getCurrentUser()

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Resumen de mi negocio</h1>
    </>
  )
}