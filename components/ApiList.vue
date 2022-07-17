<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { IApiInfo } from '~~/types/data'

const apiStore = useApiStore()

const { data } = await useAsyncData<IApiInfo[]>('api-list', async () => {
  const result = await queryContent<IApiInfo>().find()
  apiStore.apiList = result
  return result
})

const { list } = storeToRefs(apiStore)
</script>

<template>
  <ul grid="~ cols-1 gap-5" md:grid="~ cols-2" lg:grid="~ cols-3">
    <li v-for="(item, i) in list" :key="item.id">
      <ApiItem v-bind="item" :index="i" />
    </li>
  </ul>
</template>
