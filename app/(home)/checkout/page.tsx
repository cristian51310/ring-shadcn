import NullData from "@/components/null-data";
import { getCurrentUser } from "@/lib/getCurrentUser";
import CheckoutClient from "./checkout-client";

export default async function CheckoutPage() {
  const user = await getCurrentUser()

  if (!user) return (
    <NullData title="Inicia sesion para continuar" />
  )

  return (
    <div className="p-8 md:px-32 lg:px-64 md:pt-10 pt-8">
      <CheckoutClient />
    </div>
  )
}
