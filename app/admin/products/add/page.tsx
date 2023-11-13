import { getCurrentUser } from "@/lib/getCurrentUser"
import AddProductForm from "./add-form"
import NullData from "@/components/null-data"

export default async function AddProductsPage(){
  const user = await getCurrentUser()

  if(!user || user.role !== "ADMIN") return <NullData title="Acceso Denegado" />

  return(
    <div>
      <AddProductForm />
    </div>
  )
}