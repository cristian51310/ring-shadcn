import Image from "next/image"

export default function HomeBanner() {
  return(
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 mb-8 rounded-xl mt-4">
      <div className="mx-auto px-8 py-8 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="mb-8 md:mb-0 text-center">

          <h2 className="font-bold text-4xl md:text-6xl text-white mb-2 md:mb-4">
            La mejor comida
          </h2>
          <p className="text-lg md:text-xl text-white mb-2 md:mb-3">
            Disfuta de la mejor comida
          </p>
          <p className="text-2xl md:text-4xl text-blue-200 font-bold">
            Los mejores precios
          </p>

        </div>
        <div className="w-1/3 relative aspect-video">
          <Image 
            src="/image-banner.png"
            fill
            alt='Image Banner'
            className='object-contain'
          />
        </div>
      </div>
    </div>
  )
}