<script lang="ts" setup>
import type { Service } from '~/data/service'

defineProps<{
  service: Service
}>()
</script>

<template>
  <NCard
    size="small"
    class="h-full"
  >
    <NAlert
      v-show="service.endTime"
      :title="`活动截止: ${formatToDateTime(service.endTime)}`"
      :bordered="false"
      type="error"
      closable
      class="mb-2"
    />
    <NAlert
      title="使用说明"
      type="info"
      :bordered="false"
    >
      {{ service.helpText }}
    </NAlert>

    <div
      class="mt-4 flex flex-col justify-center items-center gap-4"
    >
      <slot />
    </div>
  </NCard>
</template>
