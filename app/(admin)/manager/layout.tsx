import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Restaurant Manager'
}

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zinc-950 flex flex-col gap-4 w-full h-[100vh] p-6">
      <h1 className="font-bold text-2xl">
        Restaurante - Dorichangos
      </h1>

      <div className="flex w-full h-[100vh] gap-5">
        {children}
      </div>
    </div>
  )
}