<script setup lang="ts">
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
  <div py-10 px-8 text-white h-full flex="~ col" justify-center items-center text-center>
    <h1 text-4xl font-mono font-semibold animate-bounce-in>
      KZ API
    </h1>
    <p mt-3 text-base>
      {{ desc }}
    </p>
    <p text-sm>
      共收录了 <span class="text-pink">{{ count }}</span> 个 API 接口
    </p>
    <InputEntry />
  </div>
</template>

