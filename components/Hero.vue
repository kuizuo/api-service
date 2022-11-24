<script lang="ts" setup>
const apiStore = await useApiStore()

const { title, description } = useAppConfig()
useHead({
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: description,
    },
  ],
})
</script>

<template>
  <div
    py-10 px-8 flex="~ col" justify-center items-center text-center
  >
    <h1 class="text-5xl font-mono font-semibold animate-bounce-in text-transparent bg-clip-text bg-gradient-to-r from-[#007CF0] to-[#00DFD8]">
      {{ title }}
    </h1>
    <p class="mt-4 text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] to-[#FF0080]">
      {{ description }}
    </p>
    <p class="mt-2 text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D4D] to-[#9eb3ff]">
      共收录了 <span class="text-pink">{{ apiStore.count }}</span> 个 API 接口
    </p>
    <!-- <SearchApi /> -->
  </div>
</template>

