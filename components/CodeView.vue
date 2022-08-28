<script setup lang="ts">
import hljs from 'highlight.js'
import json from 'highlight.js/lib/languages/json'
import python from 'highlight.js/lib/languages/python'

import 'highlight.js/styles/atom-one-light.css'

const props = defineProps<{
  code: string
  language: string
}>()

hljs.registerLanguage('json', json)
hljs.registerLanguage('python', python)

const codeRef = ref<HTMLElement>()

onMounted(() => {
  if (codeRef.value)
    hljs.highlightBlock(codeRef.value)
})
</script>

<template>
  <pre
    ref="codeRef" :class="`language-${props.language}`"
    class="!px-4 !py-2 text-sm h-full min-w-max"
  ><code>{{ props.code }}</code></pre>
</template>
