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

onMounted(() => {
  document.querySelectorAll('pre code').forEach((el) => {
    hljs.highlightElement(el)
  })
})

onUpdated(() => {
  document.querySelectorAll('pre code').forEach((el) => {
    hljs.highlightElement(el)
  })
})
</script>

<template>
  <div>
    <pre
      :class="`language-${props.language ?? 'json'}`"
      class="min-h-10 text-sm h-full min-w-max"
    ><code>{{ props.code }}</code></pre>
  </div>
</template>
