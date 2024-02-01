<script lang="ts" setup>
const apiStore = useApiStore()
const list = computed(() => apiStore.list)

await useAsyncData<IApi.Info[]>('api-list', async () => {
  const result = await queryContent<IApi.Info>('docs').find()

  const apiCount: { id: string, count: number }[] = JSON.parse(await $fetch('/api/count'))

  result.forEach((r) => {
    const count = apiCount.find(c => c.id === r.id)?.count ?? 0
    r.count ||= count
  })

  apiStore.apiList = result
  return result
})
</script>

<template>
  <div>
    <Hero />
    <ApiList :data="list" />
  </div>
</template>
