import { UploadCloud } from "lucide-react";

export const uploadFileContainer = "flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-neutral-100 dark:hover:bg-bray-800 dark:bg-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:border-neutral-500 dark:hover:bg-neutral-800/80"

export function UploadFileIcon() {
  return (
    <div className="flex flex-col items-center justify-center pt-5 pb-6">
      <UploadCloud className="w-12 h-12 text-gray-400" />
      <p className="mb-2 text-sm text-neutral-500 dark:text-neutral-400">
        Subir Imagen
      </p>
    </div>
  )
}