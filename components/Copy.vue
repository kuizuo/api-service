<script lang="ts" setup>
const props = defineProps<{
  result: string
}>()

const { copy, copied } = useClipboard({ })
</script>

<template>
  <span v-if="!copied" icon-btn i-carbon-copy @click="copy(props.result)" />
  <span v-if="copied" icon-btn i-carbon-checkmark text-green />
</template>
