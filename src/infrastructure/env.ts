import { z } from 'zod'

/**
 * Environment Variables Schema with Zod Validation
 *
 * Benefits:
 * - Type safety: TypeScript knows exact types
 * - Early failure: App won't start with invalid config
 * - Clear errors: Tells you exactly what's wrong
 * - Documentation: Schema = documentation
 *
 * VITE_ prefix required for client-side access in Vite
 */
const EnvSchema = z.object({
  // Environment
  MODE: z.enum(['development', 'production', 'test']).default('development'),

  // Sentry Configuration (Optional - can use placeholders)
  VITE_SENTRY_DSN: z.string().optional(),
  VITE_SENTRY_ENVIRONMENT: z.string().default('development'),

  // Feature Flags (Optional)
  VITE_ENABLE_ANALYTICS: z
    .string()
    .optional()
    .transform(val => val === 'true')
    .pipe(z.boolean())
    .default(false),

  // API Configuration (Optional for this demo app)
  VITE_API_URL: z.string().url().optional(),
})

/**
 * Validate environment variables
 *
 * Usage:
 * - Called at app startup (main.tsx)
 * - Throws error if validation fails
 * - Returns typed environment object
 */
export function validateEnv() {
  try {
    const env = EnvSchema.parse(import.meta.env)

    if (import.meta.env.DEV) {
      console.log('✅ Environment variables validated successfully')
      console.log('📝 Current environment:', env.MODE)
    }

    return env
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment configuration:')
      console.error(error.issues)
      throw new Error(
        `Environment validation failed:\n${error.issues
          .map((e: z.ZodIssue) => `  - ${e.path.join('.')}: ${e.message}`)
          .join('\n')}`
      )
    }
    throw error
  }
}

/**
 * Typed environment variables
 * Use this instead of import.meta.env for type safety
 */
export type Env = z.infer<typeof EnvSchema>

/**
 * Get typed environment variables
 * Only call after validateEnv() in main.tsx
 */
export const env = EnvSchema.parse(import.meta.env)
