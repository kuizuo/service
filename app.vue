<template>
  <NaiveConfig>
    <client-only>
      <n-loading-bar-provider>
        <naive-loading-bar navigation />
      </n-loading-bar-provider>
    </client-only>

    <n-dialog-provider>
      <n-message-provider>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </n-message-provider>
    </n-dialog-provider>
  </NaiveConfig>
</template>
