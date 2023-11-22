"use client"

interface TableButtonProps {
  tableNumber: number
  compact?: boolean
  onClick: () => void
}

export default function TableButton({ tableNumber, onClick, compact = false }: TableButtonProps) {
  return (
    <div
      className="flex aspect-square cursor-pointer hover:scale-90 transition-all duration-300 justify-center items-center w-full bg-slate-800 rounded-lg"
      onClick={onClick}
    >
      <p className={`text-xl font-bold ${compact ? "p-2" : "p-5"}`}>
        {tableNumber}
      </p>
    </div>
  )
}