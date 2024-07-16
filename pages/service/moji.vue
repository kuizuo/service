<script lang='ts' setup>
import type { FormInst, FormItemRule } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { services } from '~/data/service'

const { $client } = useNuxtApp()
const route = useRoute()
const name = route.name as string
const service = computed(() => services.find(item => `service-${item.key}` === name)!)

const message = useMessage()
const formRef = ref<FormInst | null>(null)
const model = ref({
  mobile: '',
  code: '',
})

const loading = ref(false)
const result = ref<any | null>(null)
const showHelp = ref(false)

const rules = ref({
  mobile: {
    key: 'mobile',
    required: true,
    trigger: ['input'],
    validator: (rule: FormItemRule, value: string) => {
      return /^(?:(?:\+|00)86)?1\d{10}$/.test(value)
    },
    message: '请输入正确的手机号',
  },
  code: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入验证码',
  },
})

async function sendCode() {
  try {
    await formRef.value?.validate(undefined, rule => rule?.key === 'mobile')

    await $client.moji.sendCode.mutate({ mobile: model.value.mobile })

    message.success('发送成功')
  }
  catch (error) {
    message.error((error as any).message)
  }
}

async function handleSumbit(e: MouseEvent) {
  e.preventDefault()
  loading.value = true

  await formRef.value?.validate()

  try {
    const data = await $client.moji.getCoupon.mutate({ mobile: model.value.mobile, code: model.value.code })

    result.value = data

    message.success('领券成功,请到麦当劳小程序中查看')
  }
  catch (error) {
    message.error((error as any).message)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <ServiceCard
    :service="service"
    class="relative"
  >
    <NForm
      ref="formRef"
      :model="model"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      size="small"
      class="max-w-sm"
    >
      <NFormItem
        label="手机号"
        path="mobile"
      >
        <CountDownInput
          v-model:value="model.mobile"
          :count="60"
          placeholder="请输入手机号"
          :before-start-func="sendCode"
        />
      </NFormItem>
      <NFormItem
        label="验证码"
        path="code"
      >
        <NInput
          v-model:value="model.code"
          placeholder="验证码"
        />
      </NFormItem>
      <div class="flex justify-center">
        <NButton
          type="primary"
          :loading="loading"
          :disabled="!(model.mobile && model.code)"
          @click="handleSumbit"
        >
          登录并领券
        </NButton>
      </div>
    </NForm>

    <NButton
      type="info"
      @click="showHelp = true"
    >
      点我查看如何下单
    </NButton>

    <NAlert
      v-if="result"
      title="领取结果"
      type="success"
      :bordered="false"
    >
      {{ result }}
    </NAlert>

    <NDrawer
      v-model:show="showHelp"
      :width="400"
      placement="right"
    >
      <NDrawerContent
        title="使用说明"
        :native-scrollbar="false"
        body-content-class="!p-0"
        closable
      >
        <n-image
          src="https://html5.moji.com/tpd/moji35plan2024/index/images/success1.6b19636e37920186ffa592ce3dbe1891.png"
        />
      </NDrawerContent>
    </NDrawer>
  </ServiceCard>
</template>
