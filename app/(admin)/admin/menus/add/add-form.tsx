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

export default function AddCategoryForm() {
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

      const categoryData = {
        name: data.name,
        description: data.description,
        image: uploadedImage.url,
      };

      await axios.post("/api/menus", categoryData);
      setIsProductCreated(true);
      toast.success("Categoria creada");
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
        placeholder="Bebidas, Postres, etc"
        type="text"
        label="Nombre del menu"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <TextArea
        id="description"
        label="Agrega una descripcion de los tipos de productos que se encuentran en este menu"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <p className="font-semibold">Imagen del menu</p>
      <Input
        id="image"
        type="file"
        label="Asegurate de elegir una imagen que refleje la escencia de este menu"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <Button className="my-3" onClick={handleSubmit(onSubmit)}>
        {isLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
        Agregar Menu
      </Button>
    </div>
  )
}