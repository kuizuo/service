import { z } from 'zod'
import { $fetch } from 'ofetch'
import { publicProcedure, router } from '../trpc'
import { Moji } from '~/server/protocol/moji'

// 临时使用 Map 存储 Account, 可以省去序列化过程
const map = new Map<string, Moji>()

export const MojiRouter = router({
  sendCode: publicProcedure
    .input(z.object({
      mobile: z.string().length(11, '手机号长度为11位'),
    }))
    .mutation(async (opt) => {
      const { input: { mobile } } = opt

      const moji = new Moji({ mobile })

      await moji.sendSmsCode()

      map.set(mobile, moji)

      return true
    }),
  getCoupon: publicProcedure
    .input(z.object({
      mobile: z.string().length(11, '手机号长度为11位'),
      code: z.string().length(6, '验证码长度为6位'),
    }))
    .mutation(async (opt) => {
      const { input: { mobile, code } } = opt

      const moji = map.get(mobile)

      if (!moji)
        throw new Error('你貌似还未发送验证码')

      await moji.login(code)

      return await moji.getCoupon()
    }),
})
