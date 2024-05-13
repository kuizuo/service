<script setup lang="ts">
import { ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'

const props = defineProps<{
  value: string
  count: number
  placeholder?: string
  beforeStartFunc?: () => void
}>()

const emit = defineEmits<{
  (e: 'update:value', value: string): void
}>()

const value = computed({
  get() {
    return props.value
  },
  set(value: string) {
    emit('update:value', value)
  },
})

const loading = ref(false)
const countingDown = ref(false)
const countdownSeconds = ref(props.count || 60)

const buttonText = computed(() => {
  return loading.value ? '发送中...' : countingDown.value ? `${countdownSeconds.value} 秒后重新发送` : '发送验证码'
})

const { resume, pause } = useIntervalFn(() => {
  if (countdownSeconds.value > 1) {
    countdownSeconds.value--
  }
  else {
    pause()
    countingDown.value = false
    countdownSeconds.value = props.count || 60
  }
}, 1000, {
  immediate: false,
  immediateCallback: false,
})

async function start() {
  if (countingDown.value)
    return

  const { beforeStartFunc } = props
  if (beforeStartFunc) {
    try {
      loading.value = true
      await beforeStartFunc()

      countingDown.value = true
      resume()
    }
    finally {
      loading.value = false
    }
  }
}
</script>

<template>
  <NInputGroup>
    <NInput
      v-model:value="value"
      :placeholder="placeholder"
    />
    <NButton
      :disabled="loading || countingDown"
      @click="start"
    >
      {{ buttonText }}
    </NButton>
  </NInputGroup>
</template>
