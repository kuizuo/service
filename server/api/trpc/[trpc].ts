import { createNuxtApiHandler } from 'trpc-nuxt'
import { TRPCError } from '@trpc/server'
import { appRouter } from '~/server/trpc/routers'
import { createContext } from '~/server/trpc/context'

export default createNuxtApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      // send to bug reporting
      console.error('Something went wrong', error)
    }

    if (error instanceof TRPCError)
      console.error(error)

    return error
  },

  /**
   * @link https://trpc.io/docs/caching#api-response-caching
   */
  // responseMeta() {
  //   // ...
  // },
})
