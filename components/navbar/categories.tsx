"use client"
import { categories } from "@/mocks/categories"
import { usePathname, useSearchParams } from "next/navigation"
import Category from "./category"

export default function Categories() {
  const params = useSearchParams()
  const pathname = usePathname()
  const currentCategory = params?.get("category")

  const isMainPage = pathname === "/"

  if (!isMainPage) return null

  return (
    <div className="relative px-12 flex items-center justify-between overflow-x-auto">
      {categories.map((category) => (
        <Category
          key={category.id}
          label={category.name}
          image={category.cover}
          selected={
            currentCategory === category.name || (!currentCategory && category.name === "All")
          }
        />
      ))}
    </div>
  )
}