<script setup lang="ts">
const apiStore = useApiStore()

const { data } = await useAsyncData<IApi.Info[]>('api-list', async () => {
  const result = await queryContent<IApi.Info>('apidoc').find()

  const apiCount = JSON.parse(await $fetch('/api/count'))

  apiStore.apiList = result.map((r) => {
    const count = apiCount.find(c => c.id === r.id)?.count ?? 0
    return { ...r, count }
  })

  return result
})
</script>

<template>
  <ul grid="~ cols-1 gap-5" md:grid="~ cols-2" lg:grid="~ cols-3">
    <li v-for="(item, i) in apiStore.list" :key="item.id">
      <ApiItem v-bind="item" :index="i" />
    </li>
  </ul>
</template>
