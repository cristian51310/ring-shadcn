"use client"
import { Icons } from "@/components/icons"
import CategoryInput from "@/components/inputs/category-input"
import Input from "@/components/inputs/input"
import TextArea from "@/components/inputs/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { firebaseImageUpload } from "@/lib/firebaseImageUpload"
import { categories } from "@/mocks/categories"
import axios from "axios"
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

export default function AddProductForm() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isProductCreated, setIsProductCreated] = useState<boolean>(false)

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      category: "",
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      toast.info("Subiendo imagen...");
      const uploadedImage = await firebaseImageUpload(data.image[0]);

      const productData = {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        inStock: true,
        image: uploadedImage.url,
      };

      await axios.post("/api/products", productData);
      setIsProductCreated(true);
      toast.success("Producto creado");
      router.refresh();
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

      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 overflow-y-auto max-h-[50vh]">
        {categories.map((item) => {
          if (item.name === "all") return null
          return (
            <CategoryInput
              key={item.id}
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.name}
              label={item.name}
              image={item.cover}
            />
          )
        })}
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