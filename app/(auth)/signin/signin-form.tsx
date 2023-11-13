"use client"
import { Icons } from "@/components/icons"
import Input from "@/components/inputs/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SafeUser } from "@/types"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  user: SafeUser | null
}

export function UserAuthForm({ user, className, ...props }: UserAuthFormProps) {
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/cart")
      router.refresh()
    }
  }, [router, user])

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true)
    signIn("credentials", { ...data, redirect: false, })
      .then(callback => {
        if (callback?.ok) {
          router.push("/")
          router.refresh()
          toast.success("Sesion Iniciada")
        }
        if (callback?.error) {
          toast.error(callback.error)
        }
      })
      .catch(() => toast.error("Algo salio mal"))
      .finally(() => setIsLoading(false))
  }

  if (user) return <p>Ya estas logeado... Redireccionando</p>

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">

          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            label="Email"
            register={register}
            errors={errors}
            disabled={isLoading}
            required
          />

          <Input
            id="password"
            placeholder="********"
            type="password"
            label="Contraseña"
            register={register}
            errors={errors}
            disabled={isLoading}
            required
          />

          <Button disabled={isLoading} onClick={handleSubmit(onSubmit)}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Iniciar sesion
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            O continua con
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading} onClick={() => signIn("google")}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}