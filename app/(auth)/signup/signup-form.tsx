"use client"

import { useState } from "react"
import { Icons } from "@/components/icons"
import Input from "@/components/inputs/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { FieldValues, useForm } from "react-hook-form"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { register, handleSubmit, formState: { errors }} = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">

          <Input
            id="name"
            placeholder="John Doe"
            type="text"
            label="Nombre"
            register={register}
            errors={errors}
            disabled={isLoading}
            required
          />

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

          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Registrate
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
      <Button variant="outline" type="button" disabled={isLoading}>
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