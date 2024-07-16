import { router } from '../trpc'
import { MojiRouter } from './moji'

export const appRouter = router({
  moji: MojiRouter,
})

export type AppRouter = typeof appRouter
