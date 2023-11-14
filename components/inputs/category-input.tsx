"use client"

import Image from "next/image"
import { Card } from "../ui/card"

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
  return (
    <Card
      onClick={() => onClick(label)}
      className={`p-2 flex flex-col h-40 items-center justify-center space-y-2 cursor-pointer border ${selected ? "border-orange-400" : "border-gray-300"} `}
    >
      <div className=" overflow-hidden rounded-md">
        <Image
          src={image}
          alt={label}
          width={100}
          height={100}
          className="object-cover rounded-md aspect-square hover:scale-110 transition-all duration-300"
        />
      </div>
      <p className="text-sm font-medium text-center">{label}</p>
    </Card>
  )
}