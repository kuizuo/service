<script lang='ts' setup>
import type { FormInst } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { services } from '~/data/service'

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
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入手机号',
  },
  code: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入验证码',
  },
})

function sendCode() {
  try {
    message.success('发送成功')
  }
  catch (error) {
    message.error(error)
  }
}

function handleSumbit(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log(model.value)
      message.success('验证成功')
    }
    else { message.error('验证失败') }
  })
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
        <n-input-group>
          <n-input
            v-model:value="model.mobile"
            placeholder="请输入手机号"
          />
          <n-button
            type="primary"
            ghost
            @click="sendCode()"
          >
            获取验证码
          </n-button>
        </n-input-group>
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
