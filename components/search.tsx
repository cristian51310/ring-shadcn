"use client"
import { Input } from "@/components/ui/input"
import { IoSearchOutline } from "react-icons/io5"
import { Button } from "./ui/button"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import queryString from "query-string"

export function Search() {
  const router = useRouter()

  const { register, handleSubmit, reset, formState: {errors} } = useForm<FieldValues>({
    defaultValues: {
      search: ""
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if(!data.search) return router.push("/")

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {search: data.search}
      },
      {skipNull: true}
    )

    router.push(url)
    reset({search: ""})
  }

  return (
    <div className="flex items-center gap-1">
      <Input
        type="search"
        placeholder="Comida, Restaurantes, ..."
        className="md:w-[100px] lg:w-[300px]"
        autoComplete="off"
        {...register("search")}
      />
      <Button onClick={handleSubmit(onSubmit)} variant="outline" size={"icon"}>
        <IoSearchOutline className="h-6 w-6" />
      </Button>
    </div>
  )
}