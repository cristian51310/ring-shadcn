'use client'
import { useRouter } from 'next/navigation'
import { MouseEventHandler, useCallback, useEffect, useRef } from 'react'
import { Card, CardContent } from '../ui/card'

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null)
  const wrapper = useRef(null)
  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss()
      }
    },
    [onDismiss, overlay, wrapper]
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    },
    [onDismiss]
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <div
      ref={overlay}
      className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/30 backdrop-blur-md"
      onClick={onClick}
    >
      <Card
        ref={wrapper}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-40px)] sm:w-10/12 md:w-11/12 lg:w-10/12 xl:w-8/12 p-9 pb-3 dark:bg-zinc-800 rounded-xl"
      >
        <CardContent className='flex justify-between items-center'>
          {children}
        </CardContent>
      </Card>
    </div>
  )
}