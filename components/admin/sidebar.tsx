"use client"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  IoAppsOutline,
  IoBarChartOutline,
  IoCalendarOutline,
  IoMenuOutline,
  IoNotificationsOutline,
  IoPizza,
  IoPizzaOutline,
  IoReceiptOutline,
  IoCalculatorOutline,
  IoStorefrontOutline
} from "react-icons/io5"

interface SideBarItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  pathname: string
  href: string
  children: React.ReactNode
}

const sidebarOptions = [
  {
    href: "/admin",
    icon: IoBarChartOutline,
    label: "Resumen"
  },
  {
    href: "/admin/restaurant",
    icon: IoStorefrontOutline,
    label: "Datos del restaurante"
  },
  {
    href: "/admin/products",
    icon: IoPizzaOutline,
    label: "Productos"
  },
  {
    href: "/admin/menus",
    icon: IoMenuOutline,
    label: "Menus"
  },
  {
    href: "/admin/categories",
    icon: IoAppsOutline,
    label: "Categorias"
  },
  {
    href: "/admin/orders",
    icon: IoReceiptOutline,
    label: "Ordenes"
  },
  {
    href: "/admin/reservations",
    icon: IoCalendarOutline,
    label: "Reservas"
  },
  {
    href: "/admin/notifications",
    icon: IoNotificationsOutline,
    label: "Notificaciones"
  },
  {
    href: "/manager",
    icon: IoCalculatorOutline,
    label: "Administrador de mesas"
  }
]

function SideBarItem({ pathname, href, children }: SideBarItemProps) {
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
    <div className={cn("min-h-[calc(100vh-80px)] space-y-4 p-4 ", className)}>
      <h2 className="mb-6 mt-4 px-4 text-xl font-bold">Dashboard</h2>
      <div className="grid gap-2">
        {sidebarOptions.map((option, index) => (
          <SideBarItem
            key={index}
            pathname={pathname}
            href={option.href}
          >
            <option.icon className="text-xl mr-3" />
            {option.label}
          </SideBarItem>
        ))}
      </div>
    </div>
  )
}