<script lang="ts" setup>
import pkg from '~/package.json'
</script>

<template>
  <header class="px-4 py-2 flex gap-2">
    <div class="flex gap-2 items-center w-full">
      <NuxtLink to="/">
        <UIcon name="i-mdi-api" class="text-[#007CF0] text-xl inline-block cursor-pointer select-none transition duration-200 ease-in-out hover:animate-swing" />
      </NuxtLink>

      <div class="flex flex-auto justify-end">
        <TheNavigation />
      </div>

      <div class="flex gap-1 justify-end">
        <Search />
        <ColorModePicker />
        <UButton
          :to="pkg.repository.url"
          target="_blank"
          color="gray"
          variant="ghost"
          icon="i-carbon-logo-github"
        />
      </div>
    </div>
  </header>
</template>
