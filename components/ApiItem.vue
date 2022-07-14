<script setup lang="ts">
const props = defineProps<{
  id: string | number
  name: string
  desc: string
  href: string
  status: boolean
}>()
const { id, name, desc, href, status } = toRefs(props)
</script>

<template>
  <div
    py-3
    px-4
    h-26
    border="~ rounded gray-300"
    flex="~ col"
    transition
    duration-200
    shadow
    hover="~ shadow-lg -translate-y-1"
  >
    <div
      flex="~ row"
      justify-between
      items-center
    >
      <h3
        text="xl left blue-4"
        font-mono font-bold
        hover="text-red-4"
        transition duration-150
        cursor-pointer
      >
        <NuxtLink :to="href">
          {{ name }}
        </NuxtLink>
      </h3>
      <i v-if="status" icon-btn i-carbon-checkmark-filled text-green />
      <i v-else icon-btn i-carbon-close-filled text-red />
    </div>

    <p mt-2 text="sm left gray-4" leading-normal line-clamp-2>
      {{ desc }}
    </p>
  </div>
</template>
