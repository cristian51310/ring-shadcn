import { z } from "zod"

const categorySchema = z.object({
  name: z
    .string()
    .min(3)
    .max(255),
  description: z
    .string()
    .min(3)
    .max(255),
  image: z
    .string()
    .url(),
})