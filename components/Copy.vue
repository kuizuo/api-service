<script lang="ts" setup>
const props = defineProps<{
  result: string
}>()

const toast = useToast()
const { copy, copied } = useClipboard({ })

function handleCopy() {
  copy(props.result)
  toast.add({
    title: '复制成功',
  })
}
</script>

<template>
  <span v-if="!copied" icon-btn i-carbon-copy-link @click="handleCopy" />
  <span v-if="copied" icon-btn i-carbon-checkmark text-green />
</template>
