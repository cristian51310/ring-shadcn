"use client"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { Input as ShadcnInput } from "../ui/input"
import { Label } from "../ui/label"

interface InputProps {
  id: string
  label: string
  placeholder?: string
  type?: string
  disabled?: boolean
  required?: boolean
  accept?: string
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
  id, label, placeholder, type, disabled, accept, required, register, errors
}) => {
  return (
    <div className="grid gap-3 mb-1.5">
      <Label htmlFor={id}>
        {label}
      </Label>

      <ShadcnInput
        id={id}
        placeholder={placeholder}
        type={type}
        autoCapitalize="none"
        autoCorrect="off"
        accept={accept}
        required={required}
        disabled={disabled}
        {...register(id, { required })}
      />
    </div>
  )
}

export default Input