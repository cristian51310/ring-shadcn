import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import Link from "next/link"
import { UserAuthForm } from "./signup-form"
import { getCurrentUser } from "@/lib/getCurrentUser"

export const metadata: Metadata = {
  title: "Ring! | Registrate",
  description: "Queremos que seas parte de la familia, asi que registrate",
}

export default async function AuthenticationPage() {
  const user = await getCurrentUser()

  return (
    <>
      <Link
        href="/signin"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Iniciar sesion
      </Link>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Crea una cuenta
            </h1>
            <p className="text-sm text-muted-foreground">
              Queremos que seas parte de la familia
            </p>
          </div>
          <UserAuthForm user={user}/>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Al continuar estas aceptando nuestros{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terminos de uso
            </Link>{" "}
            y{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Politica de privacidad
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}