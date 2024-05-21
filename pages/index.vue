<script lang="ts" setup>
import { type Service, services } from '~/data/service'

const router = useRouter()

function handleClickItem(item: Service) {
  router.push({ path: `/service/${item.key}` })
}
</script>

<template>
  <div>
    <NGrid
      x-gap="12"
      cols="2 l:3"
      responsive="screen"
    >
      <NGi
        v-for="item in services"
        :key="item.key"
      >
        <NCard
          size="small"
          class="h-full"
        >
          <template #cover>
            <div class="cursor-pointer h-[150px]">
              <img
                class="w-full h-full overflow-hidden object-contain"
                :src="item.logo"
                :alt="item.title"
                @click="handleClickItem(item)"
              >
            </div>
          </template>
          <template #header>
            <h2
              class="text-center text-base cursor-pointer"
              @click="handleClickItem(item)"
            >
              {{ item.title }}
            </h2>
          </template>
          <template #footer>
            <p class="text-center text-sm">
              {{ item.desc }}
            </p>
          </template>
        </NCard>
      </NGi>
    </NGrid>
  </div>
</template>
