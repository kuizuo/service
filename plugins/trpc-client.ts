import { createTRPCNuxtClient, httpLink } from 'trpc-nuxt/client'
import type { AppRouter } from '~/server/trpc/routers'

export default defineNuxtPlugin(() => {
  /**
   * createTRPCNuxtClient adds a `useQuery` composable
   * built on top of `useAsyncData`.
   */
  const client = createTRPCNuxtClient<AppRouter>({
    links: [
      httpLink({
        url: '/api/trpc',
      }),
    ],
  })

  return {
    provide: {
      client,
    },
  }
})

export type client = ReturnType<typeof createTRPCNuxtClient<AppRouter>>
