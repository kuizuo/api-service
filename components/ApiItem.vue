<script setup lang="ts">
const { id, name, desc, index } = defineProps<{
  id: string | number
  name: string
  desc: string
  index: number
}>()

const docPath = 'apidoc'
const href = ref(`/${docPath}/${id}`)

const colors = [
  'red',
  'cyan',
  'green',
  'purple',
  'yellow',
  'blue',
  'pink',
  'indigo',
  'orange',
]

const color = computed(() => colors[index % colors.length])
</script>

<template>
  <div
    py-3 px-4 h-26 border="~ rounded-lg 2 transparent" flex="~ col" transition duration-200 shadow="~ lg"
    :class="`group shadow-${color}-500/20 ring-${color}-500 `" hover="~ ring-2"
  >
    <div flex="~ row" justify-between items-center>
      <h3 text="xl left" font-sans font-extrabold transition duration-150 :class="`text-${color}-500`">
        <NuxtLink :to="href">
          {{ name }}
        </NuxtLink>
      </h3>
      <NuxtLink :to="href">
        <div class="transition-opacity duration-200 ease-in-out rounded-full opacity-0 group-hover:opacity-100">
          <i i-carbon-arrow-right icon-btn />
        </div>
      </NuxtLink>
    </div>

    <p mt-2 text="sm left gray-4" leading-normal line-clamp-2>
      {{ desc }}
    </p>
  </div>
</template>
