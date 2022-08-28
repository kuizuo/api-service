<script setup lang="ts">
interface Doc extends IApi.Doc {
  title: string
  _path: string
}

const router = useRoute()
const id = $computed(() => router.params.id as string)

const location = useBrowserLocation()
const origin = location.value.origin ?? ''

const { data } = await useAsyncData<Doc>(id, () => queryContent<Doc>('apidoc').where({ id }).findOne(), { server: true })
const { name, desc, params, path, method, dataType, example, _path } = data.value
const url = origin + path
const urlExample = origin + example

const response = ref('')
async function fetchExample() {
  if (dataType === 'img')
    return

  if (dataType === 'json') {
    const { data } = await useFetch<string>(urlExample, { server: false, initialCache: false })
    response.value = data.value
  }
  else {
    const { data } = await useFetch<string>(urlExample, { server: false, initialCache: false })
    response.value = data.value
  }
  // console.log('response', response.value)
}
await fetchExample()

const { data: { value: [prev, next] } } = await useAsyncData<Doc[]>(
  `${id}-findSurround`,
  () => queryContent<Doc>().findSurround(_path),
  { server: true })

const tabs = [
  {
    title: '接口信息',
    name: 'info',
    component: defineAsyncComponent(() => import('~/components/ApiPage/ApiInfo.vue')),
  },
  {
    title: '接口测试',
    name: 'test',
    component: defineAsyncComponent(() => import('~/components/ApiPage/ApiTest.vue')),
  },
]

let active = $ref(0)
let underlineWidth = $ref(0)
let underlineOffsetLeft = $ref(0)

onMounted(() => {
  underlineWidth = document.querySelector('.tabs-item')?.clientWidth ?? 0
  underlineOffsetLeft = document.querySelector('.tabs-item')?.offsetLeft ?? 0
})

function setActive(i, ev: Event) {
  active = i
  underlineWidth = (ev.target as HTMLElement).clientWidth
  underlineOffsetLeft = (ev.target as HTMLElement).offsetLeft
}

const component = computed(() => tabs[active].component)

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
  <div mb-8>
    <div class="doc-info" mb-6>
      <ApiHeader v-bind="{ name, desc, urlExample }" />
      <div>
        <ul class="tabs">
          <div
            class="tabs-items__underline" :style="{
              width: `${underlineWidth}px`,
              transform: `translateX(${underlineOffsetLeft}px)`,
            }"
          />
          <li v-for="(item, i) in tabs" :key="i" :name="item.name" class="tabs-item" @click="setActive(i, $event)">
            {{ item.title }}
          </li>
        </ul>

        <div class="panel" mt-4>
          <keep-alive>
            <component :is="component" v-bind="{ url, method, dataType, urlExample, params, response }" />
          </keep-alive>
        </div>
      </div>
    </div>
    <ApiPagination v-bind="{ prev, next }" />
  </div>
</template>

<style scoped>
.thin-scrollbar::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}

.thin-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175);
}

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

.tabs-item:hover {
  background-color: #eaeaea;
}

html.dark .tabs-item:hover {
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

.tabs-items__underline {
  contain: '';
  background: #ccc;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
  height: 2px;
  transition: all .3s ease;
}
</style>
