"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { Label } from "../ui/label"
import { Textarea as ShadcnTextarea } from "../ui/textarea"

interface InputProps {
  id: string
  label: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

const TextArea: React.FC<InputProps> = ({
  id, label, placeholder, disabled, required, register, errors
}) => {
  return (
    <div className="grid gap-3 mb-1.5">
      <Label htmlFor={id}>
        {label}
      </Label>

      <ShadcnTextarea
        id={id}
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect="off"
        required={required}
        disabled={disabled}
        {...register(id, { required })}
      />
    </div>
  )
}

export default TextArea