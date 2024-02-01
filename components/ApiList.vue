<script setup lang="ts">
defineProps<{
  data: IApi.Info[]
}>()
</script>

<template>
  <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    <li v-for="(item, i) in data" :key="item.id">
      <ApiItem v-bind="item" :index="i" />
    </li>
  </ul>
</template>
