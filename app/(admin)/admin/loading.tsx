import { Icons } from "@/components/icons"

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-100px)]">
      <Icons.spinner className="mr-2 h-10 w-10 animate-spin" />
    </div>
  )
}