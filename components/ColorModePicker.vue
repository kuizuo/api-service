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
    <ColorScheme tag="span">
      <UIcon
        v-if="colorMode.preference === 'dark'"
        name="i-heroicons-moon-20-solid"
      />
      <UIcon
        v-else-if="colorMode.preference === 'light'"
        name="i-heroicons-sun-20-solid"
      />
      <UIcon
        v-else
        name="i-heroicons-computer-desktop-20-solid"
      />
    </ColorScheme>
  </UButton>
</template>
