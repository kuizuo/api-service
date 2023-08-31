<script setup lang="ts">
const colorMode = useColorMode()
function onClick() {
  const values = ['system', 'light', 'dark']
  const index = values.indexOf(colorMode.preference)
  const next = (index + 1) % values.length

  colorMode.preference = values[next]
}
</script>

<template>
  <UButton
    aria-label="Color Mode"
    color="gray"
    variant="ghost"
    @click="onClick"
  >
    <ColorScheme>
      <UIcon
        v-if="colorMode.preference === 'dark'"
        name="i-heroicons-moon"
      />
      <UIcon
        v-else-if="colorMode.preference === 'light'"
        name="i-heroicons-sun"
      />
      <UIcon
        v-else
        name="i-heroicons-computer-desktop"
      />
    </ColorScheme>
  </UButton>
</template>
