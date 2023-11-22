"use client"
import { Icons } from "@/components/icons"
import Input from "@/components/inputs/input"
import TextArea from "@/components/inputs/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { firebaseImageUpload } from "@/lib/firebaseImageUpload"
import { SafeUser } from "@/types"
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

export default function ManageRestaurantForm({ user }: { user: SafeUser | null }) {

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
      neighborhood: "",
      state: "Guanajuato",
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

  const onSubmit2: SubmitHandler<FieldValues> = async (data) => {
    console.log(data)
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      toast.loading("Subiendo imagen...");
      const imageLogo = await firebaseImageUpload(data.logo[0]);
      const imageCover = await firebaseImageUpload(data.cover[0]);

      const restaurantData = {
        name: data.name,
        description: data.description,
        logo: imageLogo.url,
        cover: imageCover.url,
        street: data.street,
        city: data.city,
        zip: data.zip,
        exteriorNumber: data.exteriorNumber,
        interiorNumber: data.interiorNumber,
        neighborhood: data.neighborhood,
        state: data.state,
        email: data.email,
        phone: data.phone,
        userID: user?.id,
      };

      await axios.post("/api/restaurant", restaurantData);
      setIsProductCreated(true);
      toast.success("Restaurante creado");
      router.refresh();
    } catch (error) {
      setIsLoading(false);
      toast.error("Algo salió mal");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="grid gap-4">

      <Separator />
      <p className="text-center font-bold">Datos de Visualizacion</p>
      <Separator />

      <Input
        id="name"
        type="text"
        label="Nombre de tu restaurate"
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

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 my-2">
        <Input
          id="logo"
          type="file"
          label="Selecciona el logo de tu restaurante"
          accept="image/*"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
        <Input
          id="cover"
          type="file"
          label="Selecciona la portada de tu restaurante"
          accept="image/*"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
      </div>

      <Separator />
      <p className="text-center font-bold">Datos de direccion</p>
      <Separator />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8">
        <Input
          id="street"
          type="text"
          label="Calle"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
        <Input
          id="city"
          type="text"
          label="Ciudad"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
        <Input
          id="neighborhood"
          type="text"
          label="Colonia"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
        <Input
          id="zip"
          type="text"
          label="Codigo postal"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
        <Input
          id="exteriorNumber"
          type="text"
          label="Numero exterior"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
        <Input
          id="interiorNumber"
          type="text"
          label="Numero interior"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
        <Input
          id="state"
          type="text"
          label="Estado"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
      </div>

      <Separator />
      <p className="text-center font-bold">Datos de contacto</p>
      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
        <Input
          id="email"
          type="text"
          label="Correo electronico de servicio al cliente"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
        <Input
          id="phone"
          type="text"
          label="Telefono de contacto"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
      </div>

      <Button className="my-3" onClick={handleSubmit(onSubmit)}>
        {isLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
        Registrar mi restaurante
      </Button>
    </div>
  )
}