"use client"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  IoAddCircleOutline,
  IoAppsOutline,
  IoBarChartOutline,
  IoCalendarOutline,
  IoNotificationsOutline,
  IoPizzaOutline,
  IoReceiptOutline
} from "react-icons/io5"

interface SideBarItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  pathname: string
  href: string
  children: React.ReactNode
}

function SideBarItem({
  pathname, href, children
}: SideBarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: pathname === href ? "secondary" : "ghost" }),
        "w-full justify-start"
      )}
    >
      {children}
    </Link>
  )
}

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-6 px-4 text-xl font-bold">
            Dashboard
          </h2>

          <div className="grid gap-2">
            <SideBarItem
              pathname={pathname}
              href="/admin"
            >
              <IoBarChartOutline className="text-xl mr-3" />
              Resumen
            </SideBarItem>

            <SideBarItem
              pathname={pathname}
              href="/admin/products/add"
            >
              <IoAddCircleOutline className="text-xl mr-3" />
              Añadir producto
            </SideBarItem>

            <SideBarItem
              pathname={pathname}
              href="/admin/products"
            >
              <IoPizzaOutline className="text-xl mr-3" />
              Productos
            </SideBarItem>

            <SideBarItem
              pathname={pathname}
              href="/admin/categories"
            >
              <IoAppsOutline className="text-xl mr-3" />
              Categorias
            </SideBarItem>

            <SideBarItem
              pathname={pathname}
              href="/admin/orders"
            >
              <IoReceiptOutline className="text-xl mr-3" />
              Ordenes
            </SideBarItem>

            <SideBarItem
              pathname={pathname}
              href="/admin/reservations"
            >
              <IoCalendarOutline className="text-xl mr-3" />
              Reservas
            </SideBarItem>

            <SideBarItem
              pathname={pathname}
              href="/admin/notifications"
            >
              <IoNotificationsOutline className="text-xl mr-3" />
              Notificaciones
            </SideBarItem>
          </div>
        </div>
      </div>
    </div>
  )
}