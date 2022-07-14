<script setup lang="ts">
import type { IApi } from '~~/types/data'

const props = defineProps<{ data: IApi[] }>()

const { data } = toRefs(props)
</script>

<template>
  <ul grid="~ cols-1 gap-4" md:grid="~ cols-2" lg:grid="~ cols-3">
    <li v-for="item in data" :key="item.id">
      <ApiItem v-bind="item" />
    </li>
  </ul>
</template>
