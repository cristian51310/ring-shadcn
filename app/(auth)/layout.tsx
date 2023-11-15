import Image from "next/image"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">

      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center  gap-3">
          <Image
            src={"/logo.png"}
            width={40}
            height={40}
            alt="Ring!"
          />
          <p className="text-xl font-medium">
            Ring!
          </p>
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

      {children}
    </div>
  )
}