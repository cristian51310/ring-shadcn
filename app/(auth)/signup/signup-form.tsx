"use client"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SafeUser } from "@/types"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  user: SafeUser | null
}

export function UserAuthForm({ user, className, ...props }: UserAuthFormProps) {
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/")
      router.refresh()
    }
  }, [router, user])

  const [isLoading, setIsLoading] = useState<boolean>(false)

  if (user) return <p>Ya estas logeado... Redireccionando</p>

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ingresa con
          </span>
        </div>
      </div>
      <Button
        className="my-3"
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true)
          signIn("google")
        }}
      >
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