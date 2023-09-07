<script lang="ts" setup>
defineProps<{
  name: string
  desc: string
  count: number
}>()
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-600 mr-1 inline-flex items-center gap-1">
        {{ name }}
      </h2>
      <p class="mt-2 text-sm icon-btn inline-flex items-center">
        <UIcon name="i-heroicons-link" class="mr-[4px]" /> 共被调用 {{ count ?? 0 }} 次
      </p>
    </div>
    <p class="mt-2 p-4 text-sm border-l-[5px] border-primary-500">
      {{ desc }}
    </p>
  </div>
</template>
