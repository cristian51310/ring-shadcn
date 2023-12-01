import Footer from "@/components/footer/footer"
import Header from "@/components/navbar/header"
import Navbar from "@/components/navbar/navbar"
import CartProvider from "@/providers/CartProvider"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <Navbar />
      {children}
      <Footer />
    </CartProvider>
  )
}