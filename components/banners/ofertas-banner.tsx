import Image from "next/image"
import { Button } from "../ui/button"

export default function OfertasBanner() {
  return (
    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl my-1 overflow-hidden">
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
          <p className="text-xl font-bold text-card text-white">Ven a conocernos</p>
          <p className="text-card text-white">Disfruta de lo mejor en dorichangos y te canela</p>
          <Button
            className="mt-3 bg-transparent text-card"
            variant={"outline"}
          >
            Echemos un vistazo
          </Button>
        </div>
      </div>
    </div>
  )
}