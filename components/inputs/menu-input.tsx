"use client"

import Image from "next/image"
import { Card } from "../ui/card"
import clsx from "clsx"

interface MenuInputProps {
  selected?: boolean
  label: string
  image: string
  onClick: (value: string) => void
}

export default function MenuInput({ selected, label, image, onClick }: MenuInputProps) {
  return (
    <Card
      onClick={() => onClick(label)}
      className={clsx(
        "p-2 flex flex-col h-40 items-center justify-center space-y-2 cursor-pointer border",
        selected ? "border-orange-400 border-[5px]" : "border-neutral-500 border dark:border-neutral-700"
      )}
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