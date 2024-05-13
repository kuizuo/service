/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/server/routers
 * @see https://trpc.io/docs/server/procedures
 */
import { initTRPC } from '@trpc/server'
import { ZodError } from 'zod'
import type { Context } from './context'

const t = initTRPC.context<Context>().create({
  errorFormatter(opts) {
    const { shape, error } = opts

    if (error.cause instanceof ZodError) {
      return {
        ...shape,
        data: {},
        message: error.cause.errors[0].message,
        zodError:
          error.code === 'BAD_REQUEST'
            ? error.cause.flatten()
            : null,
      }
    }

    return {
      ...shape,
    }
  },
})

/**
 * Unprotected procedure
 */
export const publicProcedure = t.procedure

export const router = t.router
export const middleware = t.middleware
