import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;

const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const restaurantSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es requerido"
    })
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres"
    })
    .max(255, {
      message: "El nombre debe tener menos de 255 caracteres"
    }),

  description: z
    .string({
      required_error: "La descripción es requerida"
    })
    .min(30, {
      message: "La descripción debe tener al menos 30 caracteres"
    })
    .max(255),

  logo: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, "El tamaño máximo de la imagen es de 5MB")
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "El formato de la imagen no es válido"
    ),

  cover: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, "El tamaño máximo de la imagen es de 5MB")
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "El formato de la imagen no es válido"
    ),

  street: z
    .string({
      required_error: "La calle es requerida"
    })
    .min(3, {
      message: "La calle debe tener al menos 3 caracteres"
    }),

  city: z
    .string({
      required_error: "La ciudad es requerida"
    })
    .min(3, {
      message: "La ciudad debe tener al menos 3 caracteres"
    }),

  zip: z
    .string({
      required_error: "El código postal es requerido"
    })
    .min(5, {
      message: "El código postal debe tener al menos 5 caracteres"
    })
    .max(7, {
      message: "El código postal debe tener menos de 10 caracteres"
    }),

  exteriorNumber: z
    .string({
      required_error: "El número exterior es requerido"
    })
    .min(1, {
      message: "El número exterior debe tener al menos 1 caracter"
    }),

  interiorNumber: z
    .string()
    .optional(),

  neighborhood: z
    .string({
      required_error: "La colonia es requerida"
    })
    .min(3, {
      message: "La colonia debe tener al menos 3 caracteres"
    }),

  state: z
    .string({
      required_error: "El estado es requerido"
    })
    .min(3, {
      message: "El estado debe tener al menos 3 caracteres"
    }),

  email: z
    .string({
      required_error: "El correo electrónico es requerido"
    })
    .email({
      message: "El correo electrónico no es válido"
    }),

  phone: z
    .string({
      required_error: "El teléfono es requerido"
    })
    .min(10, {
      message: "El teléfono debe tener al menos 10 caracteres"
    })
})