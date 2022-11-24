<script setup lang="ts">
const url = ref('https://www.apifox.cn/apidoc/shared-2d5e3749-2d01-49fe-b889-6a309bd88bb7')
</script>

<template>
  <div>
    <div flex justify-center items-center>
      <a :href="url" target="_blank" class="inline-flex items-center gap-2 mb-2 text-center text-[#f44f4d] ">
        <span text-xl>Open ApiFox</span>
        <img src="/img/apifox.png" width="30" height="30">
      </a>
    </div>
    <iframe :src="url" w-full min-h-2xl frameborder="0" />
  </div>
</template>

