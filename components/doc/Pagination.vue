<script lang="ts" setup>
const { prev, next } = defineProps<{
  prev: any
  next: any
}>()
</script>

<template>
  <nav class="pagination-nav grid gap-4 flex justify-between">
    <NuxtLink v-if="prev?.name" :to="prev._path">
      <UButton
        icon="i-carbon-arrow-left" size="md" color="primary" variant="solid" :label="prev.name"
        :trailing="false"
      />
    </NuxtLink>
    <NuxtLink v-if="next?.name" class="col-[2/3]" :to="next._path">
      <UButton
        icon="i-carbon-arrow-right" size="md" color="primary" variant="solid" :label="next.name"
        :trailing="true"
      />
    </NuxtLink>
  </nav>
</template>

<style lang="postcss" scoped>
.pagination-nav {
  grid-template-columns: repeat(2, auto)
}
</style>
