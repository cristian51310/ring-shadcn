import { FieldValues, UseFormRegister } from "react-hook-form"
import { Checkbox as ShadcnCheckbox } from "../ui/checkbox"
import { Label } from "../ui/label"

interface CheckBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  label: string
  disabled?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
}

export default function CheckBox({ id, label, disabled, required, register }: CheckBoxProps) {
  return (
    <div className="flex items-center space-x-2 mb-1.5">
      <ShadcnCheckbox
        id={id}
        required={required}
        disabled={disabled}
        {...register(id, { required })}
      />
      <Label htmlFor={id}>
        {label}
      </Label>
    </div>
  )
}