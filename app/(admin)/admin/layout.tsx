import { Menu } from "@/components/admin/menu"
import { Sidebar } from "@/components/admin/sidebar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Administracion'
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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