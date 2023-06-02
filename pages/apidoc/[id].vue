<script lang="ts" setup>
import DocInfo from '~/components/doc/Info.vue'
import DocTest from '~/components/doc/Test.vue'

interface Doc extends IApi.Doc {
  title: string
  _path: string
}

const router = useRoute()
const id = computed(() => router.params.id as string)

const location = useBrowserLocation()
const origin = location.value.origin ?? ''

const { data } = await useAsyncData<Doc>(`content-${id.value}`, () => queryContent<Doc>('apidoc').where({ id: { $eq: id.value } }).findOne(), { server: true })
const { data: count } = await useFetch(`/api/count?id=${id.value}`)
const { name, desc, params, path, method, dataType, _path } = data.value!
const url = origin + path
const urlExample = ref(`${origin}${path}?${params.filter(p => p.required).map(param => `${param.key}=${param.value}`).join('&')}`)

const { data: pageInfo } = await useAsyncData<Doc[]>(
  `${id.value}-findSurround`,
  async () => {
    const [prev, next] = await queryContent<Doc>().findSurround(_path)
    return [prev, next]
  },
  { server: true })

const [prev, next] = pageInfo.value!

const tabs = [
  {
    title: '接口信息',
    name: 'info',
    component: DocInfo,
  },
  {
    title: '接口测试',
    name: 'test',
    component: DocTest,
  },
]

const active = ref(0)

const component = computed(() => tabs[active.value].component)

useHead({
  title: `${name} - KZ API`,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: desc,
    },
  ],
})
</script>

<template>
  <div class="doc-info" mb-6>
    <DocHeader v-bind="{ name, desc, count }" />
    <div>
      <ul class="tabs">
        <li v-for="(item, i) in tabs" :key="i" :name="item.name" class="tabs-item" :class="`${active === i ? 'active' : ''}`" @click="active = i">
          {{ item.title }}
        </li>
      </ul>

      <div class="panel" mt-4>
        <keep-alive>
          <component :is="component" v-bind="{ url, urlExample, path, method, dataType, params }" />
        </keep-alive>
      </div>
    </div>
  </div>
  <DocPagination v-bind="{ prev, next }" />
</template>

<style scoped>
.tabs {
  position: relative;
  display: flex;
  justify-content: center;
  gap: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eaeaea;
}

.dark .tabs {
  border-bottom: 1px solid #444;
}

.tabs-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.2rem 0.8rem;
  cursor: pointer;
  border: 0;
  border-radius: 6px;
  background-color: transparent;
  transition: background .12s ease-out;
}

.tabs-item.active::after {
  background: #ccc;
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 2px;
  width: 100%;
  transition: all .3s ease;
}

.tabs-item:hover {
  background-color: #eaeaea;
}

.dark .tabs-item:hover {
  background-color: #333;
}

.tabs-content {
  display: none;
  text-align: left;
}

.tabs-content.active {
  display: block;
  opacity: 1;
}
</style>
