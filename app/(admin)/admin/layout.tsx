import { Menu } from "@/components/admin/menu"
import { Sidebar } from "@/components/admin/sidebar"
import { getCurrentUser } from "@/lib/getCurrentUser"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Administracion'
}

export default async function AdminLayout({ children, modal }: { children: React.ReactNode, modal?: React.ReactNode }) {
  const user = await getCurrentUser()

  if (!user || (user.role !== "ADMIN" && user.role !== "SUPERADMIN")) {
    return (
      <div className="w-full min-h-screen px-6 md:px-12 flex flex-col items-center justify-center ">
        <h1 className="text-xl md:text-4xl font-bold text-center">
          Acceso denegado
        </h1>
      </div>
    )
  }

  return (
    <>
      <Menu />

      <div className="border-y bg-background">
        <div className="grid lg:grid-cols-5">
          <Sidebar className="hidden lg:block" />

          <div className="col-span-3 lg:col-span-4 lg:border-l">
            <div className="h-full px-8 py-6 lg:px-8">
              {children}
            </div>
          </div>

        </div>
      </div>

      {modal}
    </>
  )
}