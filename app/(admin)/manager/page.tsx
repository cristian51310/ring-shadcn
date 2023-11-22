"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatPrice } from "@/lib/formatPrice";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import TableButton from "./components/table-button";
import { products } from "./data";

const tables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function ManagerPage() {
  const [table, setTable] = useState<number | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      search: ""
    }
  })

  console.log(table)

  return (
    <>
      <div className="flex max-h-[88vh] flex-col items-start gap-6 rounded-xl w-4/12 bg-zinc-900 p-4">

        {table ? (
          <div className="flex justify-between items-center w-full">
            <p className="font-semibold text-xl my-2.5">Mesa seleccionada: <span className="font-bold">{table}</span></p>
            <Button onClick={() => setTable(null)}>
              Cancelar
            </Button>
          </div>
        ) : (
          <p className="font-bold text-xl my-2.5">Seleccionar mesa</p>
        )}

        {table ? (
          <div className="w-full h-full flex flex-col bg-black p-3 rounded-xl justify-between">
            <div className="flex flex-col gap-3 p-2">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>0</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Cargos por servicio</span>
                <span>0</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total</span>
                <span>0</span>
              </div>
            </div>

            <Button>
              Tomar Orden
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3 w-full">
            {tables.map((mesa, index) => (
              <TableButton
                key={index}
                onClick={() => setTable(mesa)}
                tableNumber={mesa}
              />
            ))}
          </div>
        )}


      </div >

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
              <Dialog key={index}>
                <DialogTrigger>
                  <div className="flex flex-col cursor-pointer hover:scale-90 transition-all duration-300 justify-between aspect-square w-full bg-zinc-800 rounded-lg">
                    <p className="text-lg p-5">{product.name}</p>
                    <p className="text-md font-bold p-5">{formatPrice(product.price)}</p>
                  </div>
                </DialogTrigger>
                <DialogContent className={table ? "bg-slate-700" : "bg-red-900"}>
                  {table ? (
                    <DialogTitle>Elige la cantidad</DialogTitle>
                  ) : (
                    <>
                      <DialogTitle>Selecciona primero una mesa</DialogTitle>
                      <div className="grid grid-cols-5 gap-2 mt-3">
                        {tables.map((mesa, index) => (
                          <TableButton
                            key={index}
                            onClick={() => setTable(mesa)}
                            tableNumber={mesa}
                            compact
                          />
                        ))}
                      </div>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            ))}
          </div>
          <ScrollBar hidden />
        </ScrollArea>
      </div>
    </>

  )
}