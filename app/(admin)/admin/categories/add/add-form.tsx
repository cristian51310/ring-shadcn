"use client"
import { Icons } from "@/components/icons"
import Input from "@/components/inputs/input"
import TextArea from "@/components/inputs/textarea"
import { Button } from "@/components/ui/button"
import { firebaseImageUpload } from "@/lib/firebaseImageUpload"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
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
      description: "",
      image: null,
    }
  })

  useEffect(() => {
    if (isProductCreated) {
      reset()
      setIsProductCreated(false)
    }
  }, [isProductCreated, reset])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      toast.info("Subiendo imagen...");
      const uploadedImage = await firebaseImageUpload(data.image[0]);

      const productData = {
        name: data.name,
        description: data.description,
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
        placeholder="ingresa el nombre de la categoria"
        type="text"
        label="Nombre de la categoria"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <TextArea
        id="description"
        placeholder="Descripcion de la categoria"
        label="Descripcion"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <p className="font-semibold">Imagen de la categoria</p>
      <Input
        id="image"
        type="file"
        label="Selecciona una imagen para la categoria"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <Button className="my-3" onClick={handleSubmit(onSubmit)}>
        {isLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
        Agregar Categoria
      </Button>
    </div>
  )
}