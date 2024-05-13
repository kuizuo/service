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

const { mutate: sendCodeApi } = $client.mcdonald.sendCode.useMutation()
async function sendCode() {
  try {
    await formRef.value?.validate(undefined, rule => rule?.key === 'mobile')

    await sendCodeApi({ mobile: model.value.mobile })
    message.success('发送成功')
  }
  catch (error) {
    throw new Error((error as any)?.[0]?.[0]?.message)
  }
}

async function handleSumbit(e: MouseEvent) {
  e.preventDefault()

  await formRef.value?.validate()

  await $client.mcdonald.getCoupon.mutate({ mobile: model.value.mobile, code: model.value.code })
}
</script>

<template>
  <ServiceCard :service="service">
    <NForm
      ref="formRef"
      :model="model"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      size="small"
      :style="{
        maxWidth: '640px',
      }"
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
          @click="handleSumbit"
        >
          登录并领券
        </NButton>
      </div>
    </NForm>
  </ServiceCard>
</template>
