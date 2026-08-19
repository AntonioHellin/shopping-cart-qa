import { z } from 'zod'

const envSchema = z.object({
  VITE_MAX_CART_ITEMS: z
    .string() // Env vars son siempre strings
    .transform(Number) // Convertir a número
    .pipe(z.number().min(1).max(999)), // Validar rango
})

export const env = envSchema.parse({
  VITE_MAX_CART_ITEMS: import.meta.env.VITE_MAX_CART_ITEMS,
})

