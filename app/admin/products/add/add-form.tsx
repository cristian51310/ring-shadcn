"use client"
import { Icons } from "@/components/icons"
import CategoryInput from "@/components/inputs/category-input"
import CheckBox from "@/components/inputs/checkbox"
import Input from "@/components/inputs/input"
import TextArea from "@/components/inputs/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import firebaseApp from "@/lib/firebase"
import { categories } from "@/mocks/categories"
import axios from "axios"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
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
      inStock: false,
      image: null,
    }
  })

  const setCustomValue = useCallback((id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  }, [setValue]);

  useEffect(() => {
    if (isProductCreated) {
      reset()
      setIsProductCreated(false)
    }
  }, [isProductCreated, reset])

  const category = watch("category")

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    let uploadedImages: UploadImageType[] = []

    const handleImageUpload = async () => {
      toast.info("Subiendo imagen...")
      try {
        const fileName = new Date().getTime() + "-" + data.image[0].name
        const storage = getStorage(firebaseApp)
        const storageRef = ref(storage, `products/${fileName}`)
        const uploadTask = uploadBytesResumable(storageRef, data.image[0])

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              console.log("upload in progress: ", progress, "%")
              switch (snapshot.state) {
                case "paused":
                  console.log("upload is paused")
                  break
                case "running":
                  console.log("upload is running")
                  break
              }
            },
            (error) => {
              console.log("error uploading image ", error)
              reject(error)
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadUrl) => {
                  uploadedImages.push({ ...data.image[0], url: downloadUrl })
                  console.log("file avaliable in ", downloadUrl)
                  resolve()
                })
                .catch((error) => {
                  console.log("error getting download url ", error)
                  reject(error)
                })
            }
          )
        })

      } catch (error) {
        setIsLoading(false)
        console.log("error handle image upload ", error)
        toast.error("Algo salio mal")
      }
    }

    await handleImageUpload()
    const productData = {
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      inStock: data.inStock,
      images: uploadedImages
    }

    axios.post("/api/products", productData)
      .then(() => {
        setIsProductCreated(true)
        toast.success("Producto creado")
        router.refresh()
      })
      .catch((error) => {
        toast.error("Algo salio mal")
        console.log("error creating product ", error)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="grid gap-4">

      <Input
        id="name"
        placeholder="John Doe"
        type="text"
        label="Nombre"
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

      <CheckBox
        id="inStock"
        label="En stock"
        register={register}
        disabled={isLoading}
      />

      <Label className="my-3">
        Seleccionar una Categoria
      </Label>

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

      <Button
        className="my-3"
        onClick={handleSubmit(onSubmit)}
      >
        {isLoading && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        Agregar Producto
      </Button>
    </div>
  )
}