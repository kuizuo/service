<template>
  <NaiveConfig>
    <client-only>
      <n-loading-bar-provider>
        <naive-loading-bar navigation />
      </n-loading-bar-provider>
    </client-only>

    <n-dialog-provider>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </n-dialog-provider>
  </NaiveConfig>
</template>
