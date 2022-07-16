<script setup lang="ts">
const { data } = useAsyncData('api-list', () => queryContent().find())

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <div>
    <ApiList :data="data" />
  </div>
</template>
