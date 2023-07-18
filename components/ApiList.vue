<script setup lang="ts">
interface ICountData {
  id: string
  count: number
}

const apiStore = useApiStore()

const { data } = await useAsyncData<IApi.Info[]>('api-list', async () => {
  const result = await queryContent<IApi.Info>('apidoc').find()

  const apiCount: ICountData[] = JSON.parse(await $fetch('/api/count'))

  apiStore.apiList = result.map((r) => {
    const count = apiCount.find(c => c.id === r.id)?.count ?? 0
    return { ...r, count }
  })

  return result
})
</script>

<template>
  <ul class="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-5">
    <li v-for="(item, i) in apiStore.list" :key="item.id">
      <ApiItem v-bind="item" :index="i" />
    </li>
  </ul>
</template>
