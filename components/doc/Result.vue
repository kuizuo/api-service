<script lang="ts" setup>
import hljs from 'highlight.js'
import json from 'highlight.js/lib/languages/json'

import 'highlight.js/styles/atom-one-light.css'

const { dataType, urlExample } = defineProps<{
  dataType: string
  urlExample: string
}>()

const { data: response, refresh, pending } = await useFetch<string>(urlExample, { server: false })

hljs.registerLanguage('json', json)

onMounted(() => {
  document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el as HTMLElement))
})

onUpdated(() => {
  document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el as HTMLElement))
})
</script>

<template>
  <div>
    <div
      class="relative flex items-center my-2 text-center text-gray-400 text-sm truncate
    before:content-[''] before:top-[50%] before:w-[50%] before:translate-y-[50%] before:border-t before:border-gray-200 dark:border-gray-700)
    after:content-[''] after:top-[50%] after:w-[50%] after:translate-y-[50%] after:border-t after:border-gray-200 dark:border-gray-700)
    "
    >
      <span class="px-2">响应结果</span>
      <UTooltip text="刷新">
        <UIcon name="i-mdi-refresh" @click="refresh" />
      </UTooltip>
    </div>
    <div class="h-auto w-full relative border dark:border-gray-600 dark:bg-gray-800">
      <div v-if="pending">
        <USkeleton class="h-4 w-[250px]" />
      </div>
      <div class="group relative overflow-x-auto">
        <div v-if="dataType === 'json'">
          <div>
            <pre
              class="language-json min-h-10 text-sm h-full min-w-max"
            ><code class="!bg-transparent">{{ response }}</code></pre>
          </div>
        </div>
        <div v-else-if="dataType === 'img'">
          <img :src="urlExample">
        </div>
        <div v-else>
          <div class="min-h-[12px] p-4 h-full font-sans text-base">
            {{ response }}
          </div>
        </div>
        <div class="absolute top-3 right-3 transition opacity-0 group-hover:opacity-100">
          <Copy :result="response" />
        </div>
      </div>
    </div>
  </div>
</template>
