<script lang="ts" setup>
import pkg from '~/package.json'

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>

<template>
  <nav class="px-4 flex gap-2">
    <NuxtLink to="/" class="flex gap-2 items-center">
      <UIcon name="i-mdi-api" class="text-[#007CF0] text-xl inline-block cursor-pointer select-none transition duration-200 ease-in-out hover:animate-swing" />
    </NuxtLink>

    <div class="flex-auto" />

    <div class="my-4 flex text-xl justify-center gap-3">
      <NuxtLink to="/about" class="flex gap-2 items-center text-base font-sans icon-btn">
        关于
      </NuxtLink>
      <UButton
        :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
        color="gray"
        variant="ghost"
        aria-label="Theme"
        @click="isDark = !isDark"
      />
      <UButton
        :to="pkg.repository.url"
        target="_blank"
        color="gray"
        variant="ghost"
        icon="i-carbon-logo-github"
      />
    </div>
  </nav>
</template>
