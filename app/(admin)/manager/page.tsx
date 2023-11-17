"use client"
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatPrice } from "@/lib/formatPrice";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { products } from "./data";

export default function ManagerPage() {
  const [table, setTable] = useState<number | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      search: ""
    }
  })

  return (
    <>
      <div className="flex max-h-[88vh] flex-col items-start gap-6 rounded-xl w-4/12 bg-zinc-900 p-6">

        <p className="font-bold text-xl">Seleccionar mesa</p>

        <div className="grid grid-cols-4 gap-3 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mesa, index) => (
            <div
              key={index}
              className="flex aspect-square cursor-pointer hover:scale-90 transition-all duration-300 justify-center items-center w-full bg-slate-800 rounded-lg"
              onClick={() => setTable(mesa)}
            >
              <p className="text-xl font-bold p-5">
                {mesa}
              </p>
            </div>
          ))}
        </div>

      </div>

      <div className="flex flex-col max-h-[88vh] gap-4 items-start rounded-xl w-8/12 bg-zinc-900 p-6">

        <div className="grid gap-3 mb-1.5 w-full">
          <Input
            id="search"
            placeholder="Buscar los productos de tu negocio"
            type="search"
            className="border-zinc-600 bg-zinc-800 py-7 text-base w-full"
          />
        </div>

        <ScrollArea className="w-full rounded-sm">
          <div className="grid grid-cols-4 gap-4">
            {products.map((product, index) => (
              <div
                key={index}
                className="flex flex-col cursor-pointer hover:scale-90 transition-all duration-300 justify-between aspect-square w-full bg-zinc-800 rounded-lg"
              >
                <p className="text-lg p-5">
                  {product.name}
                </p>

                <p className="text-md font-bold p-5">
                  {formatPrice(product.price)}
                </p>
              </div>
            ))}
          </div>
          <ScrollBar hidden />
        </ScrollArea>
      </div>
    </>

  )
}