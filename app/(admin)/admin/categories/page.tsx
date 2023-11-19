import getProducts from "@/lib/getProducts"
import { DataTableDemo } from "./manage-categories"
import Link from "next/link"
import { IoAddCircleOutline } from "react-icons/io5"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default async function ManageCategoriesPage() {
  const products = await getProducts()

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-4">Administrar Categorias</h1>
        <Link
          className={cn(
            buttonVariants({ variant: "default" }),
            "justify-center items-center"
          )}
          href={"/admin/products/add"}
        >
          <IoAddCircleOutline className="mr-2 w-4 h-4" />
          Agregar Categoria
        </Link>
      </div>
      <DataTableDemo products={products} />
    </>
  )
}