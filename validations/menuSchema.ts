import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;

const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const menuSchema = z.object({
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
  image: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, "El tamaño máximo de la imagen es de 5MB")
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "El formato de la imagen no es válido"
    ),
})