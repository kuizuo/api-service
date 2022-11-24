<script setup lang="ts">
const { title } = defineProps<{
  title: string
}>()
</script>

<template>
  <div
    class="flex my-2 text-center truncate
    before:(content-none relative top-50% w-50% translate-y-50% b-t-1 b-gray-2 dark:b-gray-7)
    after:(content-none relative top-50% w-50% translate-y-50% b-t-1 b-gray-2 dark:b-gray-7)
    "
  >
    <span px-2 text-gray-4 text-sm>{{ title ?? '' }}</span>
  </div>
</template>

