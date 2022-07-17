<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { IApiInfo } from '~~/types/data'

const { data: list } = useAsyncData<IApiInfo[]>('api-list', () => queryContent<IApiInfo>().find())

const searchStore = useSearchStore()
const { name } = storeToRefs(searchStore)

watch(name, (val) => {
  list.value = unref(list)?.filter(data => data.name.match(new RegExp(val, 'i'))) ?? []
}, {
  immediate: true,
})
</script>

<template>
  <ul grid="~ cols-1 gap-5" md:grid="~ cols-2" lg:grid="~ cols-3">
    <li v-for="(item, i) in list" :key="item.id">
      <ApiItem v-bind="item" :index="i" />
    </li>
  </ul>
</template>
