<script lang="ts" setup>
import hljs from 'highlight.js'
import json from 'highlight.js/lib/languages/json'

import 'highlight.js/styles/atom-one-light.css'

const { dataType, url } = defineProps<{
  dataType: string
  url: string
}>()

const { data: response, refresh, pending } = await useFetch<string>(url, { server: false })

const { copy, copied } = useClipboard()
const toast = useToast()
function handleCopy() {
  copy(response.value!)
  toast.add({
    title: '复制成功',
    timeout: 2000,
  })
}

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
    before:content-[''] before:top-[50%] before:w-[50%] before:translate-y-[50%] before:border-t before:border-dashed before:border-gray-300 dark:border-gray-800)
    after:content-[''] after:top-[50%] after:w-[50%] after:translate-y-[50%] after:border-t after:border-dashed after:border-gray-300 dark:border-gray-800)
    "
    >
      <div class="flex justify-center items-center gap-1 mx-3 text-base">
        <span>响应结果</span>
        <UTooltip text="刷新">
          <UIcon class="cursor-pointer" name="i-mdi-refresh" @click="refresh" />
        </UTooltip>
      </div>
    </div>
    <div class="h-auto min-h-[48px] w-full relative border dark:border-gray-600">
      <div v-if="pending" class="p-2">
        <USkeleton class="h-12 w-full" />
      </div>
      <div v-else class="group relative overflow-x-auto">
        <template v-if="dataType === 'json'">
          <pre
            class="language-json min-h-[10rem] max-h-[30rem] text-sm h-full"
          ><code class="!bg-transparent w-full">{{ response }}</code></pre>
        </template>
        <template v-else-if="dataType === 'img'">
          <img :src="url">
        </template>
        <template v-else>
          <div class="min-h-[20px] p-4 h-full font-sans text-base">
            {{ response }}
          </div>
        </template>
        <UIcon
          :name="!copied ? 'i-heroicons-clipboard-document' : 'i-heroicons-clipboard-document-check'"
          class="absolute w-5 h-5 top-3 right-3 text-primary-500 transition cursor-pointer opacity-0 group-hover:opacity-100"
          @click="handleCopy"
        />
      </div>
    </div>
  </div>
</template>
