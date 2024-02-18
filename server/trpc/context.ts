import type { H3Event } from 'h3'

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export function createContext(
  _event: H3Event,
) {
  // for API-response caching see https://trpc.io/docs/caching
  // console.log('cookies', parseCookies(event))

  return {}
}

export type Context = Awaited<ReturnType<typeof createContext>>
