"use client"
import { Icons } from "@/components/icons"
import CategoryInput from "@/components/inputs/category-input"
import Input from "@/components/inputs/input"
import MenuInput from "@/components/inputs/menu-input"
import TextArea from "@/components/inputs/textarea"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Input as InputPrimitive } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea as TextareaPrimitive } from "@/components/ui/textarea"
import { firebaseImageUpload } from "@/lib/firebaseImageUpload"
import { cn } from "@/lib/utils"
import { Category, Menu } from "@prisma/client"
import { DialogClose, DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { Separator } from "@radix-ui/react-menubar"
import axios from "axios"
import Link from "next/link"
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

interface Flavor {
  name: string;
  description: string;
}

interface Size {
  name: string;
  price: number;
  description: string;
}

export default function AddProductForm({ categories, menus }: AddProductFormProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isProductCreated, setIsProductCreated] = useState<boolean>(false)

  const [flavors, setFlavors] = useState<Flavor[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);

  const addFlavor = (flavor: Flavor) => {
    setFlavors((prevFlavors) => [...prevFlavors, flavor]);
  };

  const removeFlavor = (index: number) => {
    setFlavors((prevFlavors) => [
      ...prevFlavors.slice(0, index),
      ...prevFlavors.slice(index + 1),
    ]);
  };

  const addSize = (size: Size) => {
    setSizes((prevSizes) => [...prevSizes, size]);
  };

  const removeSize = (index: number) => {
    setSizes((prevSizes) => [
      ...prevSizes.slice(0, index),
      ...prevSizes.slice(index + 1),
    ]);
  };

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
    setIsLoading(true);

    try {
      toast.loading("Agregando producto...")
      const uploadedImage = await firebaseImageUpload(data.image[0]);

      const flavorsData = flavors.map((flavor) => ({
        name: flavor.name,
        description: flavor.description,
      }));

      const sizesData = sizes.map((size) => ({
        name: size.name,
        price: size.price,
        description: size.description,
      }));

      const productData = {
        name: data.name,
        description: data.description,
        price: data.price,
        image: uploadedImage.url,
        inStock: true,
        menuId: menu,
        category: data.category,
        sizes: sizesData,
        flavors: flavorsData,
      };

      await axios.post("/api/products-beta", productData);
      setIsProductCreated(true);
      toast.success("Producto creado");
      router.push("/admin/productsbeta");

      console.log(productData)
    } catch (error) {
      setIsLoading(false);
      toast.error("Algo salió mal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-4">

      <Input
        id="name"
        type="text"
        label="Nombre del producto"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <Input
        id="price"
        type="number"
        label="Precio"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <TextArea
        id="description"
        label="Descripcion del producto"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <Label className="my-3">Seleccionar las categorias de tu producto</Label>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-5 overflow-y-auto">
        {categories.map((item) => {
          if (item.name === "all") return null;
          return (
            <CategoryInput
              key={item.id}
              onClick={() => {
                const currentCategories = watch("category") || [];
                const updatedCategories = currentCategories.includes(item.id)
                  ? currentCategories.filter((categoryId: any) => categoryId !== item.id)
                  : [...currentCategories, item.id];
                setCustomValue("category", updatedCategories);
              }}
              selected={category.includes(item.id)} // Check if category ID is in the array
              label={item.name}
              image={item.image}
            />
          );
        })}
      </div>


      <div className="flex items-center justify-between w-full border-b">
        <Label className="my-7">Seleccionar un menu donde estara tu producto</Label>
        {menus.length > 0 && (
          <Link href={"/admin/menus/add"} className={cn(buttonVariants({ variant: "secondary" }))}>
            Agregar Menu
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 overflow-y-auto max-h-[50vh]">
        {menus.length === 0 ? (
          <div className="flex items-center gap-5 col-span-4">
            <p className="text-sm text-gray-500 md:col-span-5 col-span-2">
              No hay menus disponibles, necesitas crear uno para poder agregar un producto
            </p>
            <Link
              href={"/admin/menus/add"}
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Agregar Menu
            </Link>
          </div>
        ) : (
          menus.map((item) => (
            <MenuInput
              key={item.id}
              onClick={() => setCustomValue("menu", item.id )}
              selected={menu === item.id}
              label={item.name}
              image={item.image}
            />
          ))
        )}
      </div>

      <p className="font-semibold py-3">Imagen principal del producto</p>
      <Input
        id="image"
        type="file"
        label="Selecciona una imagen para tu producto"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <Separator />
      <p className="font-semibold">Sabores disponibles</p>
      <p className="text-muted-foreground text-sm">Tu producto tiene alguna variacion de sabor?, agregala aqui</p>
      <div className="grid grid-cols-4 gap-6">
        {flavors.map((flavor, index) => (
          <Card
            key={index}
            className="flex flex-col items-center justify-between p-3 pt-5 gap-6"
          >
            <p>{flavor.name}</p>
            <Button
              variant="destructive"
              onClick={() => removeFlavor(index)}
            >
              Eliminar
            </Button>
          </Card>
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              Agregar Sabor
            </Button>
          </DialogTrigger>
          <DialogContent className="dark:bg-zinc-900">
            <DialogHeader>
              <DialogTitle>Agrega un sabor para el producto</DialogTitle>
              <DialogDescription className="text-sm">
                Si el producto tiene variaciones de sabor agrega cada una hasta completarlas
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <InputPrimitive
                type="text"
                placeholder="Nombre del sabor"
                onChange={(e) => setCustomValue("flavorName", e.target.value)}
              />
              <TextareaPrimitive
                placeholder="Descripción del sabor"
                onChange={(e) => setCustomValue("flavorDescription", e.target.value)}
              />
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    addFlavor({
                      name: watch("flavorName"),
                      description: watch("flavorDescription"),
                    });
                  }}
                >
                  Agregar Sabor
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Separator />
      <p className="font-semibold">Tamaños de los productos</p>
      <p className="text-muted-foreground text-sm">Agrega los tamaños en los que este producto esta disponible</p>
      <div className="grid grid-cols-4 gap-6">
        {sizes.map((flavor, index) => (
          <Card
            key={index}
            className="flex flex-col items-center justify-between p-3 pt-5 gap-6"
          >
            <p>{flavor.name}</p>
            <Button
              variant="destructive"
              onClick={() => removeSize(index)}
            >
              Eliminar
            </Button>
          </Card>
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              Agregar Sabor
            </Button>
          </DialogTrigger>
          <DialogContent className="dark:bg-zinc-900">
            <DialogHeader>
              <DialogTitle>Agrega un sabor para el producto</DialogTitle>
              <DialogDescription className="text-sm">
                Si el producto tiene variaciones de sabor agrega cada una hasta completarlas
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <InputPrimitive
                type="text"
                placeholder="Nombre del tamaño"
                onChange={(e) => setCustomValue("sizeName", e.target.value)}
              />
              <InputPrimitive
                type="number"
                placeholder="Precio del tamaño"
                onChange={(e) => setCustomValue("sizePrice", e.target.value)}
              />
              <TextareaPrimitive
                placeholder="Descripción del tamaño"
                onChange={(e) => setCustomValue("sizeDescription", e.target.value)}
              />
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    addSize({
                      name: watch("sizeName"),
                      price: watch("sizePrice"),
                      description: watch("sizeDescription"),
                    })
                  }}
                >
                  Agregar Sabor
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Button className="my-3" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
        {isLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
        Agregar Producto
      </Button>
    </div>
  )
}