<script lang="ts" setup>
const { name, desc, count } = defineProps<{
  name: string
  desc: string
  count: number
}>()
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h2 text-2xl font-600 mr-1 inline-flex items-center gap-1>
        {{ name }}
      </h2>
      <p mt-2 text-sm icon-btn inline-flex items-center>
        <i i-carbon-attachment /> 共被调用 {{ count ?? 0 }} 次
      </p>
    </div>
    <p mt-2 p-4 text-sm border="l-5 blue">
      {{ desc }}
    </p>
  </div>
</template>

<style scoped>
</style>
