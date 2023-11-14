import Image from "next/image"
import { Button } from "../ui/button"

export default function HomeBanner() {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl my-1 overflow-hidden">
      <div className="flex py-4 justify-center items-center w-full">
        <div className="relative -left-12">
          <Image
            src="/image-banner.png"
            className="object-cover"
            alt="Picture of the author"
            width={400}
            height={200}
          />
        </div>
        <div className="flex flex-col gap-2 relative right-6">
          <p className="text-xl font-bold text-card text-white">Precios Irresistibles</p>
          <p className="text-card text-white">Disfruta de nuestros mejores precios, ven a comprobarlo</p>
          <Button
            className="mt-3 bg-transparent text-card"
            variant={"outline"}
          >
            Vamos a ver las ofertas
          </Button>
        </div>
      </div>
    </div>
  )
}