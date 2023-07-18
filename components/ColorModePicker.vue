<script setup lang="ts">
const colorMode = useColorMode()
const onClick = () => {
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
        name="i-carbon-moon"
      />
      <UIcon
        v-else-if="colorMode.preference === 'light'"
        name="i-carbon-sun"
      />
      <UIcon
        v-else
        name="i-carbon-window-auto"
      />
    </ColorScheme>
  </UButton>
</template>

