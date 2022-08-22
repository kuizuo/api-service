<script lang="ts" setup>
const { name, desc, urlExample } = defineProps<{
  name: string
  desc: string
  urlExample: string
}>()
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h2 text-2xl font-600 mr-1 inline-flex items-center gap-1>
        {{ name }}
        <i icon-btn i-carbon-checkmark-filled text-green />
      </h2>
      <NuxtLink class="btn text-sm" target="_blank" :to="urlExample">
        测试一下
      </NuxtLink>
    </div>
    <p mt-2 p-4 text-sm border="l-5 blue">
      {{ desc }}
    </p>
  </div>
</template>

<style scoped>
</style>
