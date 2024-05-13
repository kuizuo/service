import { router } from '../trpc'
import { McdonaldRouter } from './mcdonald'

export const appRouter = router({
  mcdonald: McdonaldRouter,
})

export type AppRouter = typeof appRouter
