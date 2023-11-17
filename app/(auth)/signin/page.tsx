import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import Link from "next/link"
import { UserAuthForm } from "./signin-form"
import { getCurrentUser } from "@/lib/getCurrentUser"

export const metadata: Metadata = {
  title: "Ring! | Inicia sesion",
  description: "Nos da gusto que vuelvas, inicia sesion para continuar",
}

export default async function AuthenticationPage() {
  const user = await getCurrentUser()

  return (
    <>
      <Link
        href="/signup"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Registrate
      </Link>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">

            <h1 className="text-4xl font-semibold my-5">
              Inicia sesion
            </h1>
            <p className="text-sm text-muted-foreground">
              Estamos felices de que hayas vuelto
            </p>

          </div>
          <UserAuthForm user={user}/>
        </div>
      </div>
    </>
  )
}