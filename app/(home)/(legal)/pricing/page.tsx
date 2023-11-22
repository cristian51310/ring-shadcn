import { Glow, GlowCapture } from "@codaworks/react-glow"
import "./style.css"

export default function PagePricing() {
  return (

    <GlowCapture className="flex justify-center items-center">
      <main className="max-w-[95%] md:max-w-[90%] lg:max-w-[80%] py-8 md:py-16">

        <h1 className="text-3xl font-bold text-center mb-10">Planes disponibles</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          <Glow color='purple'>
            <div className='flex flex-col justify-between gap-8 text-zinc-900 dark:text-white glow:bg-emerald-400 glow:dark:bg-emerald-500 p-8 rounded-xl border-2 border-zinc-400 dark:border-zinc-600 glow:border-emerald-800 bg-zinc-100 dark:bg-zinc-900'>
              <div>
                <h2 className="text-xl font-semibold">Basico</h2>
                <p className="text-4xl font-bold mt-5">$9.99</p>
                <ul role="list" className="card__bullets flow mt-5">
                  <li>Access to advanced workouts and nutrition plans</li>
                  <li>Priority Email support</li>
                  <li>Exclusive access to live Q&A sessions</li>
                </ul>
              </div>

              <a href="#pro" className="w-full flex justify-center items-center rounded-xl p-4 border-2 dark:bg-neutral-200 bg-black glow:bg-emerald-500 dark:text-black text-white font-bold dark:border-neutral-400 border-black glow:border-emerald-700">
                Iniciar
              </a>
            </div>
          </Glow>

          <Glow color='purple'>
            <div className='flex flex-col justify-between gap-8 text-zinc-900 dark:text-white glow:bg-purple-400 glow:dark:bg-purple-500 p-8 rounded-xl border-2 border-zinc-400 dark:border-zinc-600 glow:border-purple-800 bg-zinc-100 dark:bg-zinc-900'>
              <div>
                <h2 className="text-xl font-semibold">Profesional</h2>
                <p className="text-4xl font-bold mt-5">$19.99</p>
                <ul role="list" className="card__bullets flow mt-5">
                  <li>Access to advanced workouts and nutrition plans</li>
                  <li>Priority Email support</li>
                  <li>Exclusive access to live Q&A sessions</li>
                </ul>
              </div>

              <a href="#pro" className="w-full flex justify-center items-center rounded-xl p-4 border-2 dark:bg-neutral-200 bg-black glow:bg-purple-500 dark:text-black text-white font-bold dark:border-neutral-400 border-black glow:border-purple-700">
                Actualizar a Pro
              </a>
            </div>
          </Glow>

          <Glow color='purple'>
            <div className='flex flex-col justify-between gap-8 text-zinc-900 dark:text-white glow:bg-red-400 glow:dark:bg-red-500 p-8 rounded-xl border-2 border-zinc-400 dark:border-zinc-600 glow:border-red-800 bg-zinc-100 dark:bg-zinc-900'>
              <div>
                <h2 className="text-xl font-semibold">Enterprise</h2>
                <p className="text-4xl font-bold mt-5">$29.99</p>
                <ul role="list" className="card__bullets flow mt-5">
                  <li>Access to advanced workouts and nutrition plans</li>
                  <li>Priority Email support</li>
                  <li>Exclusive access to live Q&A sessions</li>
                </ul>
              </div>

              <a href="#pro" className="w-full flex justify-center items-center rounded-xl p-4 border-2 dark:bg-neutral-200 bg-black glow:bg-red-500 dark:text-black text-white font-bold dark:border-neutral-400 border-black glow:border-red-700">
                Actualizar a Enterprise
              </a>
            </div>
          </Glow>
        </div>

      </main>
    </GlowCapture>

  )
}