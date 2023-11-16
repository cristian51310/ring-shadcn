"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { SafeUser } from "@/types"
import { signOut } from "next-auth/react"
import Link from "next/link"

interface UserMenuProps {
  user: SafeUser | null
}

export function UserNav({ user }: UserMenuProps) {
  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-md">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.image as string} alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      {user ? (
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <Link href="/profile">
            <DropdownMenuItem>
              Mi Perfil
            </DropdownMenuItem>
          </Link>
          <Link href="/orders">
            <DropdownMenuItem>
              Mis Ordenes
            </DropdownMenuItem>
          </Link>
          <Link href="/favorites">
            <DropdownMenuItem>
              Mis Favoritos
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            Cerrar Sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <Link href="/signin">
            <DropdownMenuItem>
              Iniciar Sesión
            </DropdownMenuItem>
          </Link>
          <Link href="/signup">
            <DropdownMenuItem>
              Registrarse
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  )
}