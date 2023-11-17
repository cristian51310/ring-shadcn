import Image from "next/image"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:h-[100vh] h-[40vh] flex-col items-center justify-center lg:grid lg:grid-cols-2 px-0">
      <div className="w-full h-full flex-col bg-zinc-900 bg-muted p-10 text-white dark:border-r flex">
        <div className="relative z-20 flex items-center gap-3">
          <Image
            src={"/logo.png"}
            width={50}
            height={50}
            alt="Ring!"
          />
          <p className="text-2xl font-medium">Ring!</p>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Esta es la mejor forma de comprar comida, encuentra
              tus comidas favoritas en un solo lugar.&rdquo;
            </p>
            <footer className="text-sm">Cristian Ruben</footer>
          </blockquote>
        </div>
      </div>

      <div className="p-8 flex items-center justify-center lg:h-[100vh] h-[60vh]">
        {children}
      </div>
    </div>
  )
}