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
    <div h-auto w-full relative border-1 dark:border-gray-6 dark:bg-gray-8>
      <div v-if="pending">
        Loading...
      </div>
      <div class="thin-scrollbar group" relative overflow-x-auto>
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
          <div min-h-12 p-4 h-full font-sans text-base>
            {{ response }}
          </div>
        </div>
        <div absolute top-3 right-3 transition opacity-0 group-hover:opacity-100>
          <Copy :result="response" />
        </div>
      </div>
    </div>
  </div>
</template>
