<script lang="ts" setup>
const { id, name, desc, index } = defineProps<{
  id: string | number
  name: string
  desc: string
  index: number
}>()

const docPath = 'apidoc'
const href = ref(`/${docPath}/${id}`)

const colors = [
  'cyan',
  'green',
  'blue',
  'purple',
  'red',
  'pink',
  'orange',
  'indigo',
  'yellow',
]

const color = computed(() => colors[index % colors.length])
</script>

<template>
  <div
    py-3 px-4 h-26 border="~ rounded-lg 2 transparent" flex="~ col" transition duration-200 shadow="~ lg"
    :class="`group shadow-${color}-500/20 ring-${color}-500 hover:ring-2 hover:bg-${color}-500/10`"
  >
    <div flex="~ row" justify-between items-center>
      <h3 text="xl left" font-sans font-extrabold transition duration-150 :class="`text-${color}-500`">
        <NuxtLink :to="href">
          {{ name }}
        </NuxtLink>
      </h3>
      <NuxtLink :to="href">
        <div class="transition-opacity duration-200 ease-in-out rounded-full opacity-0 group-hover:opacity-100">
          <i i-carbon-arrow-right inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 :class="`text-${color}-500`" />
        </div>
      </NuxtLink>
    </div>

    <p mt-2 text="sm left gray-4" leading-normal line-clamp-2>
      {{ desc }}
    </p>
  </div>
</template>
