<script lang="ts" setup>
interface Doc extends IApi.Doc {
  title: string
  _path: string
}

const router = useRoute()
const id = router.params.id

const { data } = await useAsyncData<Doc>(`content-${id}`, () => queryContent<Doc>('docs').where({ id: { $eq: id } }).findOne(), { server: true })
const { data: count } = await useFetch(`/api/count?id=${id}`)
const { name, desc, _path } = data.value!

const { data: pageInfo } = await useAsyncData<Doc[]>(
  `${id}-findSurround`,
  async () => {
    const [prev, next] = await queryContent<Doc>().findSurround(_path)
    return [prev, next]
  },
  { server: true })

const [prev, next] = pageInfo.value!

useHead({
  title: name,
  meta: [
    { hid: 'description', name: 'description', content: desc, },
  ],
})
</script>

<template>
  <div class="mb-6">
    <DocHeader v-bind="{ name, desc, count }" class="mb-4" />
    <DocInfo :info="data" class="mb-6" />
    <DocPagination v-bind="{ prev, next }" class="mt-2" />
  </div>
</template>
