"use client"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { UploadFileIcon, uploadFileContainer } from "@/components/uploadFileIcon"
import { firebaseImageUpload } from "@/lib/firebaseImageUpload"
import { SafeUser } from "@/types"
import { restaurantSchema } from "@/validations/restaurantSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { ImageIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type RestaurantFormValues = z.infer<typeof restaurantSchema>

export default function ManageRestaurantForm({ user }: { user: SafeUser | null }) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [isProductCreated, setIsProductCreated] = useState(false)
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null)
  const [selectedCover, setSelectedCover] = useState<File | null>(null)

  const form = useForm<RestaurantFormValues>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      logo: undefined,
      cover: undefined
    },
    mode: "onChange",
  })

  async function onSubmit(data: RestaurantFormValues) {
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
      router.push("/admin/restaurant");
    } catch (error) {
      setIsLoading(false);
      toast.error("Algo salió mal");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isProductCreated) {
      form.reset()
      setIsProductCreated(false)
    }
  }, [isProductCreated, form])

  if (!user) return null;

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>

        <Separator />
        <p className="text-center font-bold">Datos de Visualizacion</p>
        <Separator />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del menu</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Este es el nombre del menu, debe ser unico.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripcion del menu</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="resize-none"
                />
              </FormControl>
              <FormDescription>
                Este es el nombre del menu, debe ser unico.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagen del menu</FormLabel>
              <FormControl>
                <div className="flex items-center justify-center gap-5">
                  <Label className={uploadFileContainer}>
                    <UploadFileIcon />
                    <Input
                      type="file"
                      className="hidden"
                      name={field.name}
                      onChange={(e) => {
                        field.onChange(e.target.files);
                        setSelectedLogo(e.target.files?.[0] || null);
                      }}
                      ref={field.ref}
                    />
                  </Label>
                  {selectedLogo ? (
                    <Image
                      src={URL.createObjectURL(selectedLogo)}
                      alt="Selected"
                      width={200}
                      height={200}
                      className="rounded-md object-cover w-40 h-40 border-2"
                    />
                  ) : (
                    <div className="grid place-items-center w-40 h-40 bg-neutral-100 rounded-md border-2">
                      <ImageIcon size={56} className="text-neutral-500" />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cover"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagen del menu</FormLabel>
              <FormControl>
                <div className="flex items-center justify-center gap-5">
                  <Label className={uploadFileContainer}>
                    <UploadFileIcon />
                    <Input
                      type="file"
                      className="hidden"
                      name={field.name}
                      onChange={(e) => {
                        field.onChange(e.target.files);
                        setSelectedCover(e.target.files?.[0] || null);
                      }}
                      ref={field.ref}
                    />
                  </Label>
                  {selectedCover ? (
                    <Image
                      src={URL.createObjectURL(selectedCover)}
                      alt="Selected"
                      width={200}
                      height={200}
                      className="rounded-md object-cover w-40 h-40 border-2"
                    />
                  ) : (
                    <div className="grid place-items-center w-40 h-40 bg-neutral-100 rounded-md border-2">
                      <ImageIcon size={56} className="text-neutral-500" />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <Separator />
        <p className="text-center font-bold">Datos de direccion</p>
        <Separator />

        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calle</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Este es el nombre del menu, debe ser unico.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ciudad</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Este es el nombre del menu, debe ser unico.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="zip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Codigo postal</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Este es el nombre del menu, debe ser unico.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="exteriorNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero exterior</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Este es el nombre del menu, debe ser unico.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interiorNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero interior</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Este es el nombre del menu, debe ser unico.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero interior</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Este es el nombre del menu, debe ser unico.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero interior</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Este es el nombre del menu, debe ser unico.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />
        <p className="text-center font-bold">Datos de contacto</p>
        <Separator />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electronico de servicio al cliente</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Este es el nombre del menu, debe ser unico.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefono de contacto</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Este es el nombre del menu, debe ser unico.
              </FormDescription>
            </FormItem>
          )}
        />

        <Button className="my-3">
          {isLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
          Registrar Restaurante
        </Button>

      </form>
    </Form>
  )
}