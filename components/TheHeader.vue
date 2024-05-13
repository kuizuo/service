<script lang="ts" setup>
import { services } from '~/data/service'

const route = useRoute()
const name = route.name as string

const service = computed(() => services.find(item => `service-${item.key}` === name)!)

const isIndexPage = computed(() => {
  return route.path === '/'
})

const router = useRouter()
function handleBack() {
  router.back()
}
</script>

<template>
  <header class="py-2 h-[--app-header-height]">
    <div class="w-full h-full flex gap-2 justify-center items-center text-base">
      <template v-if="isIndexPage">
        <NaiveIcon
          name="material-symbols:design-services-outline-rounded"
          class="text-teal-600 inline-block cursor-pointer select-none transition duration-200 ease-in-out"
        />
        <span class="font-mono">
          便民服务
        </span>
      </template>
      <template v-else>
        <div class="mx-auto px-4 mt-4 w-full h-full flex gap-2 justify-center items-center text-base">
          <NaiveIcon
            name="material-symbols:arrow-back"
            class="min-w-4 inline-block cursor-pointer select-none transition duration-200 ease-in-out"
            @click="handleBack"
          />
          <div class="flex-1 flex justify-center items-center gap-2">
            <n-avatar
              size="small"
              :src="service.logo"
            />
            <span class="font-mono">
              {{ service.title }}
            </span>
          </div>
          <div
            class="min-w-4 inline-block cursor-pointer select-none transition duration-200 ease-in-out"
          />
        </div>
      </template>
    </div>
  </header>
</template>
