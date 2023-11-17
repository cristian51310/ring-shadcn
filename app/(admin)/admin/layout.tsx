import { Menu } from "@/components/admin/menu"
import { Sidebar } from "@/components/admin/sidebar"
import NullData from "@/components/null-data"
import { getCurrentUser } from "@/lib/getCurrentUser"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Administracion'
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  if (!user || (user.role !== "ADMIN" && user.role !== "SUPERADMIN")) {
    return <NullData title="Acceso Denegado" />;
  }

  return (
    <>
      <Menu />

      <div className="border-t bg-background">
        <div className="grid lg:grid-cols-5">
          <Sidebar className="hidden lg:block" />
          <div className="col-span-3 lg:col-span-4 lg:border-l">
            <div className="h-full px-4 py-6 lg:px-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}