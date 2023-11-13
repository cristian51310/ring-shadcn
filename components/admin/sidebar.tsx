"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-6 px-4 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
          <div className="space-y-3">
            <Button
              onClick={() => router.push("/admin")}
              variant={pathname === "/admin" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              Resumen
            </Button>
            <Button
              onClick={() => router.push("/admin/products/add")}
              variant={pathname === "/admin/products/add" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              Añadir producto
            </Button>
            <Button
              onClick={() => router.push("/admin/products")}
              variant={pathname === "/admin/products" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              Administrar productos
            </Button>
            <Button
              onClick={() => router.push("/admin/orders")}
              variant={pathname === "/admin/orders" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              Ordenes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}