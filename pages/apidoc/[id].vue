<script lang="ts" setup>
import DocInfo from '~/components/doc/Info.vue'
import DocTest from '~/components/doc/Test.vue'

interface Doc extends IApi.Doc {
  title: string
  _path: string
}

const router = useRoute()
const id = $computed(() => router.params.id as string)

const location = useBrowserLocation()
const origin = location.value.origin ?? ''

const { data } = await useAsyncData<Doc>(`content-${id}`, () => queryContent<Doc>('apidoc').where({ id: { $eq: id } }).findOne(), { server: true })
const { name, desc, params, path, method, dataType, _path } = data.value!
const url = origin + path
const urlExample = $ref(`${origin}${path}?${params.filter(p => p.required).map(param => `${param.key}=${param.value}`).join('&')}`)

const response = ref('')
async function fetchExample() {
  response.value = 'Loading...'
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
fetchExample()

const { data: { value: [prev, next] } } = await useAsyncData<Doc[]>(
  `${id}-findSurround`,
  () => queryContent<Doc>().findSurround(_path),
  { server: true })

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

const style = computed(() => {
  return {
    width: `${underlineWidth}px`,
    transform: `translateX(${underlineOffsetLeft}px)`,
  }
})

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
  <div>
    <div class="doc-info" mb-6>
      <DocHeader v-bind="{ name, desc }" />
      <div>
        <ul class="tabs">
          <div class="tabs-items__underline content-none" :style="style" />
          <li v-for="(item, i) in tabs" :key="i" :name="item.name" class="tabs-item" @click="setActive(i, $event)">
            {{ item.title }}
          </li>
        </ul>

        <div class="panel" mt-4>
          <keep-alive>
            <component :is="component" v-bind="{ url, path, method, dataType, params, response }" />
          </keep-alive>
        </div>
      </div>
    </div>
    <DocPagination v-bind="{ prev, next }" />
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
  background: #ccc;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  transition: all .3s ease;
}
</style>
