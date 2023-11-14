import { IconType} from "react-icons"

interface StatusProps{
  text: string
  icon: IconType
  bg: string
  color: string
}

export default function Status({text, icon: Icon, bg, color}: StatusProps){
  return(
    <div className={`flex items-center justify-center rounded-full px-2 py-1 ${bg} ${color}`}>
      <span className="mr-1">
        <Icon size={15}/>
      </span>
      <span className="font-bold text-sm">{text}</span>
    </div>
  )

}