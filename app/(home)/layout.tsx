import Footer from "@/components/footer/footer"
import MainNavbar from "@/components/navbar/main-nav"
import CartProvider from "@/providers/CartProvider"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider >
      <MainNavbar />
      {children}
      <Footer />
    </CartProvider>
  )
}