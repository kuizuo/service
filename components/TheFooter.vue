<script lang="ts" setup>
import pkg from '~/package.json'
</script>

<template>
  <footer
    class="h-[--app-footer-height]"
  >
    <div class="mx-auto h-full px-4 py-2">
      <div class="flex justify-between items-center h-full gap-2 py-4 sm:gap-x-4 sm:text-base">
        <div class="inline-flex gap-1 sm:gap-4">
          <NuxtLink
            target="_blank"
            class="flex items-center gap-1 text-xs"
          >
            <NaiveIcon name="ri-file-code-line" />
            <p class="font-semibold">
              版本: {{ pkg.version }}
            </p>
          </NuxtLink>
          <div class="flex items-center gap-1 text-xs">
            <NaiveIcon name="ri-building-2-line" />
            <span class="font-semibold">
              构建于:
            </span>
            <NuxtLink
              to="https://nuxt.com/"
              class="block bg-emerald-400 rounded px-1 py-0.5 text-white text-xs"
              target="_blank"
            >
              nuxt@{{ pkg.dependencies.nuxt }}
            </NuxtLink>
          </div>
        </div>
        <div class="flex-auto" />
        <div class="flex items-center gap-3">
          <NaiveColorModeSwitch />
          <NuxtLink
            class="flex items-center gap-1 text-xs"
            :to="pkg.repository.url"
            target="_blank"
          >
            <NaiveIcon name="ri-github-line" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>

</style>
