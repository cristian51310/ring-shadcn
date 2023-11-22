interface NullDataProps {
  title: string
  children?: React.ReactNode
}

export default function NullData({ title, children }: NullDataProps) {
  return(
    <div className="w-full h-[50vh] px-6 md:px-12 flex flex-col items-center justify-center ">
      <h1 className="text-xl md:text-2xl font-semibold text-center">{title}</h1>
      <div className="mt-6 flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  )
}