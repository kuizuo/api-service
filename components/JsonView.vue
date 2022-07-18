<script setup lang="ts">
import hljs from 'highlight.js'
import json from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/atom-one-light.css'

const props = defineProps<{
  code: string
}>()

hljs.registerLanguage('json', json)

const codeRef = ref<HTMLElement>()

onMounted(() => {
  if (codeRef.value)
    hljs.highlightBlock(codeRef.value)
})
</script>

<template>
  <pre ref="codeRef" class="!px-4 !py-2 text-sm h-full min-w-max language-json"><code>{{ props.code }}</code></pre>
</template>
