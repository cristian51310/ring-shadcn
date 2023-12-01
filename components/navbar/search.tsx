"use client"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function Search() {
  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
  }

  return (
    <div className="hidden md:flex items-center gap-1">
      <Input
        type="search"
        placeholder="Comida, Restaurantes, ..."
        className="lg:w-[330px] xl:w-[600px] border-orange-400 dark:border-amber-800"
        autoComplete="off"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  )
}