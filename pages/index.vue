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
      cols="2 s:3 l:4"
      responsive="screen"
    >
      <NGi
        v-for="item in services"
        :key="item.key"
      >
        <NCard
          size="small"
        >
          <template #cover>
            <img
              class="cursor-pointer"
              :src="item.logo"
              @click="handleClickItem(item)"
            >
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
