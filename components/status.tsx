import clsx from "clsx"
import { IconType } from "react-icons"

interface StatusProps {
  text: string
  icon: IconType
  variant: "success" | "error" | "warning" | "info"
}

export default function Status({ text, icon: Icon, variant = "success" }: StatusProps) {
  return (
    <div className={clsx(
      `flex items-center justify-center rounded-full px-2 py-1`,
      variant === "success" && "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200",
      variant === "error" && "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200",
      variant === "warning" && "bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200",
      variant === "info" && "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200",
    )}>
      <span className="mr-1">
        <Icon size={15} />
      </span>
      <span className="font-bold text-sm">{text}</span>
    </div>
  )
}