import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"
import { FacebookIcon } from "lucide-react"
import Image from "next/image"
import LanguageToggle from "../language-toggle"

export default function Footer() {
  return (
    <footer className="mx-auto w-full p-12 py-6 lg:py-8 border-t">
      <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0">
          <div className="flex items-center gap-3">
            <Image
              src={"/logo.png"}
              alt="Ring Logo"
              width={35}
              height={35}
            />
            <span className="self-center text-2xl font-semibold">
              Ring!
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-12 sm:grid-cols-2">
          <div className="text-gray-500 font-medium flex flex-col gap-4">
            <a href="#" className="hover:underline ">
              Obten Ayuda
            </a>
            <a href="#" className="hover:underline">
              Agrega tu restaurante
            </a>
            <a href="#" className="hover:underline">
              Registrate para realizar entregas
            </a>
            <a href="#" className="hover:underline">
              Crea una cuenta de negocios
            </a>
          </div>

          <div className="text-gray-500 font-medium flex flex-col gap-4">
            <a href="#" className="hover:underline">
              Restaurantes cerca de mi
            </a>
            <a href="#" className="hover:underline">
              Pedidos para llevar cerca de mi
            </a>
            <a href="#" className="hover:underline">
              Acerca de Ring!
            </a>
            <LanguageToggle />
          </div>
        </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex mt-4 sm:justify-center sm:mt-0 gap-5">
          <a href="#" className="text-gray-500 hover:text-gray-900">
            <FacebookIcon className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            <InstagramLogoIcon className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            <TwitterLogoIcon className="w-6 h-6" />
          </a>
        </div>
        <div className="flex flex-col justify-end gap-3">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <a href="#" className="hover:underline">
              Terminos &amp; Condiciones
            </a>
            <a href="#" className="hover:underline">
              Politica de Privacidad
            </a>
            <a href="#" className="hover:underline">
              Tarifas
            </a>
            <a href="#" className="hover:underline">
              Proteccion de informacion personal
            </a>
          </div>
          <span className="text-sm text-gray-500 text-end">
            © 2023 Ring!™. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  )
}