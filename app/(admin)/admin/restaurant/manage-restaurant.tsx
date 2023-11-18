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

export default function ManageRestaurantForm() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isProductCreated, setIsProductCreated] = useState<boolean>(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      logo: null,
      cover: null,
      street: "",
      city: "",
      zip: "",
      exteriorNumber: "",
      interiorNumber: "",
      state: "",
      email: "",
      phone: "",
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
      const imageLogo = await firebaseImageUpload(data.logo[0]);
      const imageCover = await firebaseImageUpload(data.cover[0]);

      const productData = {
        name: data.name,
        description: data.description,
        logo: imageLogo.url,
        cover: imageCover.url
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
        placeholder="ingresa el nombre de tu restaurante"
        type="text"
        label="Nombre del producto"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <TextArea
        id="description"
        placeholder="Descripcion de tu restaurante"
        label="Descripcion"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <p className="font-semibold py-1">Logo de tu restaurante</p>
      <Input
        id="logo"
        type="file"
        label="Selecciona el logo de tu restaurante"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <p className="font-semibold py-1">Portada para tu restaurante</p>
      <Input
        id="cover"
        type="file"
        label="Selecciona el logo de tu restaurante"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <Button className="my-3" onClick={handleSubmit(onSubmit)}>
        {isLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
        Resgistrar mi restaurante
      </Button>
    </div>
  )
}