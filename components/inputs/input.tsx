"use client"

import {
  FieldErrors,
  FieldValues,
  UseFormRegister
} from "react-hook-form"

import { Input as ShadcnInput } from "../ui/input"
import { Label } from "../ui/label"

interface InputProps {
  id: string
  label: string
  placeholder: string
  type?: string
  disabled?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  type,
  disabled,
  required,
  register,
  errors
}) => {
  return (
    <div className="grid gap-3 mb-1.5">
      <Label
        className=""
        htmlFor={id}
      >
        {label}
      </Label>

      <ShadcnInput
        id={id}
        placeholder={placeholder}
        type={type}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect="off"
        required={required}
        disabled={disabled}
        {...register(id, { required })}
      />
    </div>
  )
}

export default Input