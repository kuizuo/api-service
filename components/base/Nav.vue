<script lang="ts" setup>
import pkg from '~/package.json'
</script>

<template>
  <nav px-4 flex="~ gap-2">
    <NuxtLink to="/" flex gap-2 items-center>
      <div>
        <i i-mdi:api class="text-[#007CF0] text-xl inline-block cursor-pointer select-none transition duration-200 ease-in-out hover:animate-swing" />
      </div>
    </NuxtLink>

    <div flex-auto />

    <div text="xl" my-4 flex justify-center gap-3>
      <NuxtLink to="/about" flex gap-2 items-center>
        <span text-base font-sans icon-btn>关于</span>
      </NuxtLink>
      <DarkToggle icon-btn />
      <a i-carbon-logo-github icon-btn :href="pkg.repository.url" target="_blank" />
    </div>
  </nav>
</template>
