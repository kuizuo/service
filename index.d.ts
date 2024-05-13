import type { client } from './plugins/trpc-client'

declare module '#app' {
  interface NuxtApp {
    $client: client
  }
}

export {}
