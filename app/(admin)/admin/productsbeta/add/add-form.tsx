"use client"
import { Icons } from "@/components/icons"
import CategoryInput from "@/components/inputs/category-input"
import Input from "@/components/inputs/input"
import MenuInput from "@/components/inputs/menu-input"
import TextArea from "@/components/inputs/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Category, Menu } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

export interface ImageType {
  url: File | null
}

export interface UploadImageType {
  url: string
}

interface AddProductFormProps {
  categories: Category[]
  menus: Menu[]
}

export default function AddProductForm({ categories, menus }: AddProductFormProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isProductCreated, setIsProductCreated] = useState<boolean>(false)

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      category: [],
      image: null,
    }
  })

  const setCustomValue = useCallback((id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }, [setValue]);

  useEffect(() => {
    if (isProductCreated) {
      reset()
      setIsProductCreated(false)
    }
  }, [isProductCreated, reset])

  const category = watch("category")
  const menu = watch("menu")

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    toast.loading("Agregando producto...")
    console.log(data)
  };

  return (
    <div className="grid gap-4">

      <Input
        id="name"
        placeholder="ingresa el nombre del producto"
        type="text"
        label="Nombre del producto"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <Input
        id="price"
        placeholder="Precio"
        type="number"
        label="Precio"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <TextArea
        id="description"
        placeholder="Descripcion del producto"
        label="Descripcion"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <Label className="my-3">Seleccionar una Categoria</Label>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 overflow-y-auto">
        {categories.map((item) => {
          if (item.name === "all") return null
          return (
            <CategoryInput
              key={item.id}
              onClick={(category) => {
                const currentCategories = watch("category") || [];
                const updatedCategories = currentCategories.some((c: any) => c.id === item.id)
                  ? currentCategories.filter((c: any) => c.id !== item.id)
                  : [...currentCategories, { id: item.id, name: category }];
                setCustomValue("category", updatedCategories);
              }}
              selected={category.some((c: any) => c.id === item.id)} // Check if category is in the array
              label={item.name}
              image={item.image}
            />
          )
        })}
      </div>


      <Label className="my-3">Seleccionar un menu donde estara tu producto</Label>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 overflow-y-auto max-h-[50vh]">
        {menus.length === 0 ? (
          <p className="text-sm text-gray-500 md:col-span-5 col-span-2">
            No hay menus disponibles, necesitas crear uno para poder agregar un producto
          </p>
        ) : (
          menus.map((item) => (
            <MenuInput
              key={item.id}
              onClick={(menu) => setCustomValue("menu", menu)}
              selected={menu === item.name}
              label={item.name}
              image={item.image}
            />
          ))
        )}
      </div>

      <p className="font-semibold py-3">Imagen del producto</p>
      <Input
        id="image"
        type="file"
        label="Selecciona una imagen para tu producto"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <Button className="my-3" onClick={handleSubmit(onSubmit)}>
        {isLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
        Agregar Producto
      </Button>
    </div>
  )
}