<script setup lang="ts">
const apiCount = ref(1)
const callCount = ref(1)
</script>

<template>
  <div py-10 px-8 text-white h-full flex="~ col" justify-center items-center text-center>
    <h1 text-4xl font-mono font-semibold animate-zoom-in>
      KZ API
    </h1>
    <p mt-3 text-base>
      一个 稳定、快速、好用的 API 接口服务
    </p>
    <p text-sm>
      共收录了 <span class="text-pink">{{ apiCount }}</span> 个 API 接口，共被调用 <span class="text-pink">{{ callCount }}</span> 次
    </p>
    <InputEntry />
  </div>
</template>

