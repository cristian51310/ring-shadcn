"use client"

import { Card } from "../ui/card"
import Image from "next/image"

interface CategoryInputProps {
  selected?: boolean
  label: string
  image: string
  onClick: (value: string) => void
}

export default function CategoryInput({
  selected,
  label,
  image,
  onClick
}: CategoryInputProps) {
  return(
    <Card
      onClick={() => onClick(label)}
      className={`p-2 flex flex-col h-40 items-center justify-center space-y-2 cursor-pointer border ${selected ? "border-orange-400" : "border-gray-300"} `}
    >
      <Image
        src={image}
        alt={label}
        width={50}
        height={50}
      />
      <p className="text-sm font-medium text-center">{label}</p>
    </Card>
  )
}