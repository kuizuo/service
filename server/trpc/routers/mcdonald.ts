import { z } from 'zod'
import { $fetch } from 'ofetch'
import { publicProcedure, router } from '../trpc'

const SendCodeShape = z.object({
  mobile: z.number(),
})

export const McdonaldRouter = router({
  sendCode: publicProcedure
    .query(() => {
      return '123'
    }),
  getCoupon: publicProcedure
    .query(() => {
      return 'ok'
    }),
})
