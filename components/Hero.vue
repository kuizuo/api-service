<script lang="ts" setup>
const apiStore = await useApiStore()
const count = apiStore.count

const desc = '一个 稳定、快速、好用的 API 接口服务'

useHead({
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: desc,
    },
  ],
})
</script>

<template>
  <div
    py-10 px-8 flex="~ col" justify-center items-center text-center
  >
    <h1 class="text-5xl font-mono font-semibold animate-bounce-in text-transparent bg-clip-text bg-gradient-to-r from-[#007CF0] to-[#00DFD8]">
      KZ API
    </h1>
    <p class="mt-4 text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] to-[#FF0080]">
      {{ desc }}
    </p>
    <p class="text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D4D] to-[#F9CB28]">
      共收录了 <span class="text-pink">{{ count }}</span> 个 API 接口
    </p>
    <!-- <SearchApi /> -->
  </div>
</template>

