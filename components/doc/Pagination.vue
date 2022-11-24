<script lang="ts" setup>
const { prev, next } = defineProps<{
  prev: any
  next: any
}>()
</script>

<template>
  <nav class="pagination-nav" grid gap-4 justify-between>
    <NuxtLink v-if="prev.name" class="nav-btn justify-start self-start prev" :to="prev._path">
      <i i-carbon-arrow-left icon-btn />
      <div>
        {{ prev.name }}
      </div>
    </NuxtLink>
    <NuxtLink v-if="next.name" class="nav-btn justify-end self-end next" :to="next._path">
      <div>
        {{ next.name }}
      </div>
      <i i-carbon-arrow-right icon-btn />
    </NuxtLink>
  </nav>
</template>

<style scoped>
.pagination-nav {
  grid-template-columns: repeat(2, auto)
}

.next {
  grid-column: 2/3;
}
</style>
