import MainNavbar from "@/components/navbar/main-nav"

export default function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <MainNavbar />
      {children}
    </div>
  )
}