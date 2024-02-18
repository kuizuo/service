<script setup>
import { useAsyncData } from '#imports'

await useAsyncData(() => new Promise((resolve) => {
  setTimeout(resolve, 2000)
}))
</script>

<template>
  <n-space
    vertical
    :style="{ margin: '1em' }"
    size="large"
  >
    <n-input
      type="textarea"
      placeholder="Autosizable"
      :autosize="{
        minRows: 3,
      }"
    />
    <n-button>Buttons</n-button>
  </n-space>
</template>
