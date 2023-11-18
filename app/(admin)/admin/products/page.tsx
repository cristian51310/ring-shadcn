import getProducts from "@/lib/getProducts"
import Link from "next/link"
import { DataTableDemo } from "./manage-products"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { IoAddCircleOutline } from "react-icons/io5"

export default async function ManageProductsPage() {
  const products = await getProducts()

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-4">Administrar Productos</h1>
        <Link
          className={cn(
            buttonVariants({ variant: "default" }),
            "justify-center items-center"
          )}
          href={"/admin/products/add"}
        >
          <IoAddCircleOutline className="mr-2 w-4 h-4" />
          Agregar Producto
        </Link>
      </div>

      <DataTableDemo products={products} />
    </>
  )
}