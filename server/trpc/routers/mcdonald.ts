import { z } from 'zod'
import { $fetch } from 'ofetch'
import { publicProcedure, router } from '../trpc'
import { Mcdonald } from '~/server/protocol/mcdonalds'

const map = new Map()

export const McdonaldRouter = router({
  sendCode: publicProcedure
    .input(z.object({
      mobile: z.string().length(11, '手机号长度为11位'),
    }))
    .mutation(async (opt) => {
      const { input: { mobile }, ctx } = opt

      const mcdonald = new Mcdonald(mobile)

      await mcdonald.sendSmsCode()

      map.set(mobile, mcdonald)

      return true
    }),
  getCoupon: publicProcedure
    .input(z.object({
      mobile: z.string().length(11, '手机号长度为11位'),
      code: z.string().length(4, '验证码长度为4位'),
    }))
    .mutation(async (opt) => {
      const { input: { mobile, code }, ctx } = opt

      const mcdonald = map.get(mobile)

      if (!mcdonald)
        return false

      await mcdonald.login(code)

      await mcdonald.getCoupon()

      return true
    }),
})
