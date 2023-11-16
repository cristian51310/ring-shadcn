import NullData from "@/components/null-data";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function OrdersPage() {
  const user = await getCurrentUser()

  if (!user || user.role !== "ADMIN") return <NullData title="Acceso Denegado" />

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Mis notificaciones</h1>
    </>
  )
}