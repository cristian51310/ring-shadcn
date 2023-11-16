"use client"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import queryString from "query-string"
import { useCallback } from "react"

interface CategoryProps {
  label: string
  image: string
  selected?: boolean
}

export default function Category({ label, image, selected }: CategoryProps) {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    if (label === "All") {
      router.push("/")
    } else {
      let currentQuery = {}

      if (params) { currentQuery = queryString.parse(params.toString())}

      const updatedQuery: any = {
        ...currentQuery,
        category: label
      }

      const url = queryString.stringifyUrl(
        { url: "/", query: updatedQuery },
        { skipNull: true }
      )

      router.push(url)
    }
  }, [label, router, params])

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-between text-center gap-2 mb-1 p-1 px-2 border-b transition cursor-pointer hover:text-slate-800 hover:bg-gray-100 rounded-full ${selected ? " text-slate-800" : " text-slate-500"}`}
    >
      <Image
        src={image}
        alt={label}
        width={30}
        height={30}
        className="rounded-full aspect-square"
      />
      <p className="hidden lg:block text-sm font-medium">{label}</p>
    </div>
  )
}