<script setup lang="ts">
const { id, name, desc, index } = defineProps<{
  id: string | number
  name: string
  desc: string
  index: number
}>()

const docPath = 'apidoc'
const href = ref(`/${docPath}/${id}`)

const textColor = computed(() => (i: number) => (
  [
    'text-red-5', 'text-blue-5', 'text-purple-5', 'text-green-5', 'text-yellow-5', 'text-pink-5',
  ][i % 6]
))

const ringColor = computed(() => (i: number) => (
  [
    'ring-red-5', 'ring-blue-5', 'ring-purple-5', 'ring-green-5', 'ring-yellow-5', 'ring-pink-5',
  ][i % 6]
))

const shadowColor = computed(() => (i: number) => (
  ['shadow-red-5/20', 'shadow-blue-5/20', 'shadow-purple-5/20', 'shadow-green-5/20', 'shadow-yellow-5/20', 'shadow-pink-5/20',
  ][i % 6]
))
</script>

<template>
  <div
    py-3 px-4
    h-26
    border="~ rounded-lg 2 transparent"
    flex="~ col"
    transition duration-200
    shadow="~ xl"
    :class="`group ${shadowColor(index)} ${ringColor(index)}`"
    hover="~ ring-2"
  >
    <div
      flex="~ row" justify-between items-center
    >
      <h3
        text="xl left"
        font-sans font-extrabold
        transition duration-150
        :class="`${textColor(index)}`"
      >
        <NuxtLink :to="href">
          {{ name }}
        </NuxtLink>
      </h3>
      <NuxtLink :to="href">
        <div
          class="transition-opacity duration-200 ease-in-out rounded-full opacity-0 group-hover:opacity-100"
        >
          <i i-carbon-arrow-right icon-btn />
        </div>
      </NuxtLink>
    </div>

    <p mt-2 text="sm left gray-4" leading-normal line-clamp-2>
      {{ desc }}
    </p>
  </div>
</template>
