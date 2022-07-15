<script setup lang="ts">
import hljs from 'highlight.js'
import json from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/github-dark.css'

hljs.registerLanguage('json', json)

interface IApiDoc {
  id: string
  title: string
  desc: string
  status: boolean
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  returnType: string
  example: string
}

const router = useRoute()
const { id } = router.params

const codeRef = ref<HTMLElement>()

onMounted(() => {
  if (codeRef.value)
    hljs.highlightBlock(codeRef.value)
})
// SSR ?

// const data = useFetch(`/api/doc/${id}`)

const { copy, copied } = useClipboard({ })

const name = '每日一言'
const desc = '每日一言'
const status = true
const total = '100'
const lastTime = '2020-01-01 00:00:00'
const url = `https://img.yzcdn.cn/api/doc/${id}`
const method = 'GET'
const returnType = 'IMG'
const example = 'https://img.yzcdn.cn/vant/cat.jpeg'
const params = [
  {
    name: 'id',
    value: '123',
    type: 'string',
    desc: '图片id',
    required: true,
  },
  {
    name: 'id',
    value: '123',
    type: 'string',
    desc: '图片id',
    required: true,
  },
]
const response = ref('https://img.yzcdn.cn/vant/cat.jpeg')

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <div mb-10>
    <!-- <NuxtLink
      class="btn m-3 text-sm"
      to="/"
    >
      Back
    </NuxtLink> -->

    <div class="top">
      <div class="inline-flex justify-between items-baseline">
        <h2 text-2xl font-600 mr-1>
          {{ name }}
        </h2>
        <i v-if="status" icon-btn i-carbon-checkmark-filled text-green />
        <i v-else icon-btn i-carbon-close-filled text-red />
      </div>
      <p mt-1 text-sm text-gray-4>
        总请求次数: {{ total }} &nbsp;&nbsp;&nbsp;&nbsp;最近一次请求 {{ lastTime }}
      </p>
      <p mt-2 p-4 text-sm border="l-5 blue">
        {{ desc }}
      </p>
    </div>
    <hr mt-2 text-gray-2>
    <div mt-4>
      <h3 pl-2 text-base border="l-5 emerald">
        基本信息
      </h3>
      <div mt-2 bg-zinc-1 dark:bg-gray-8 p-4 flex="~ col" gap-3 text-sm>
        <p inline-flex items-center>
          <span w-20 text-right font-sans>接口地址：</span>
          <span ml-1 text-purple>{{ url }}</span>
          <span v-if="!copied" ml-2 icon-btn i-carbon-copy @click="copy(url)" />
          <span v-if="copied" ml-2 icon-btn i-carbon-checkmark text-green />
        </p>
        <p inline-flex items-center>
          <span w-20 text-right font-sans>请求方式：</span>
          <span ml-1 text-purple>{{ method }}</span>
        </p>
        <p inline-flex items-center>
          <span w-20 text-right font-sans>返回格式：</span>
          <span ml-1 text-purple>{{ returnType }}</span>
        </p>
        <p inline-flex items-center>
          <span w-20 text-right font-sans>请求示例：</span>
          <span ml-1 text-purple>{{ example }}</span>
        </p>
      </div>
    </div>
    <div mt-4>
      <h3 pl-2 text-base border="l-5 emerald">
        请求参数
      </h3>
      <div mt-2 w-full>
        <table class="table table-auto w-full border border-collapse">
          <thead>
            <tr>
              <th>参数名</th>
              <th>示例值</th>
              <th>类型</th>
              <th>描述</th>
              <th>是否必须</th>
            </tr>
            <tr
              v-for="param in params" :key="param.name"
              transition
              hover="bg-gray-1 dark:hover:bg-gray-8"
            >
              <td>{{ param.name }}</td>
              <td>{{ param.value }}</td>
              <td>{{ param.type }}</td>
              <td>{{ param.desc }}</td>
              <td>{{ param.required ? '是' : '否' }}</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
    <div mt-4>
      <h3 pl-2 text-base border="l-5 emerald">
        响应示例
      </h3>
      <div mt-2 h-auto>
        <div v-if="returnType === 'JSON'">
          <pre ref="codeRef" class="!px-4 !py-2 text-sm"><code class="language-json">{{ response }}</code></pre>
        </div>
        <div v-if="returnType === 'IMG'">
          <img :src="response">
        </div>
      </div>
    </div>
  </div>
</template>

<style>
table tr {
  text-align:left;
  @apply border-collapse border-1 border-gray-2;
}

table tr th {
  font-weight: 500;
}

table tr td, table tr th {
  padding: 0.25rem 0.75rem;
  @apply  border-1 border-gray-2;
}

table tr th{
  font-size:0.9rem;
  @apply bg-coolGray-1 dark:bg-gray-8;
}

table tr td {
  font-size: small;
}
</style>
