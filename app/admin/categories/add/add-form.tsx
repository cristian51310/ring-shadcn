"use client"
import { Icons } from "@/components/icons"
import Input from "@/components/inputs/input"
import TextArea from "@/components/inputs/textarea"
import { Button } from "@/components/ui/button"
import firebaseApp from "@/lib/firebase"
import axios from "axios"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
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
  const [isCategoryCreated, setIsCategoryCreated] = useState<boolean>(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      image: null,
    }
  })

  useEffect(() => {
    if (isCategoryCreated) {
      reset()
      setIsCategoryCreated(false)
    }
  }, [isCategoryCreated, reset])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    let uploadedImage: UploadImageType = { url: "" };

    const handleImageUpload = async () => {
      toast.info("Subiendo imagen...");
      try {
        const fileName = new Date().getTime() + "-" + data.image[0].name;
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, `products/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, data.image[0]);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (error) => {
              console.log("error uploading image ", error);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadUrl) => {
                  uploadedImage = { url: downloadUrl };
                  console.log("file available in ", downloadUrl);
                  resolve();
                })
                .catch((error) => {
                  console.log("error getting download url ", error);
                  reject(error);
                });
            }
          );
        });

      } catch (error) {
        setIsLoading(false);
        console.log("error handle image upload ", error);
        toast.error("Algo salió mal");
      }
    };

    await handleImageUpload();

    if (!uploadedImage) {
      setIsLoading(false);
      toast.error("Algo salió mal");
      return;
    }

    const productData = {
      name: data.name,
      description: data.description,
      image: uploadedImage.url,
    };

    axios.post("/api/products", productData)
      .then(() => {
        setIsCategoryCreated(true);
        toast.success("Categoria creada");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Algo salió mal");
        console.log("error creando categoria ", error);
      })
      .finally(() => setIsLoading(false));
  };


  return (
    <div className="grid gap-4">

      <Input
        id="name"
        type="text"
        label="Nombre"
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

      <p className="font-semibold py-3">Imagen del producto</p>
      <Input
        id="image"
        type="file"
        label="Selecciona una imagen para tu categoria"
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