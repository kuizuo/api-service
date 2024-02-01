<script lang="ts" setup>
const props = withDefaults(defineProps<{
  id: string | number
  name: string
  desc: string
  count: number
  index: number
}>(), {
  count: 0,
})

const docPath = 'docs'
const href = ref(`/${docPath}/${props.id}`)

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

const color = computed(() => colors[props.index % colors.length])
</script>

<template>
  <div
    :class="`group py-3 px-4 h-30 border rounded-lg border-transparent
    flex flex-col transition duration-200 shadow-md shadow-${color}-500/20 ring-${color}-500
    hover:ring-2 hover:bg-${color}-500 hover:bg-opacity-10`"
  >
    <div class="flex flex-row justify-between items-center">
      <h3 class="text-xl text-left">
        <NuxtLink :to="href" class="font-sans font-extrabold transition" :class="`text-${color}-500`">
          {{ name }}
        </NuxtLink>
      </h3>

      <p class="text-[0.75rem] text-gray-400 ml-2 flex items-center">
        <UIcon name="i-heroicons-link" />
        <span class="ml-[2px]">{{ count }}</span>
      </p>

      <div class="flex-auto" />

      <NuxtLink :to="href">
        <div class="transition-opacity duration-200 ease-in-out rounded-full opacity-0 group-hover:opacity-100">
          <UIcon name="i-carbon-arrow-right" class="inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100" :class="`text-${color}-500`" />
        </div>
      </NuxtLink>
    </div>

    <p class="mt-2 text-sm text-left text-gray-400 leading-normal line-clamp-1">
      {{ desc }}
    </p>
  </div>
</template>
