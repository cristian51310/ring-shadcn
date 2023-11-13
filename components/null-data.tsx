interface NullDataProps {
  title: string
}

export default function NullData({ title }: NullDataProps) {
  return(
    <div className="w-full h-[50vh] flex items-center justify-center ">
      <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
    </div>
  )
}