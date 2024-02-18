<template>
  <div
    class="relative mx-auto px-0 sm:px-8 h-full flex justify-center items-center bg-slate-50 dark:bg-slate-900"
  >
    <div
      class="absolute inset-0
      bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]
      dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]
      "
      style="background-position: 10px 10px;"
    />
    <n-layout
      class="w-[--window-width] h-[--window-height] sm:min-w-[600px] max-w-[1000px] rounded-lg ring-1 ring-slate-900/5 shadow-xl"
    >
      <n-layout-header>
        <TheHeader />
      </n-layout-header>
      <n-layout-content content-style="padding: 16px; height: calc(var(--window-height) - var(--app-header-height) - var(--app-footer-height))">
        <slot />
      </n-layout-content>
      <n-layout-footer>
        <TheFooter />
      </n-layout-footer>
    </n-layout>
  </div>
</template>
