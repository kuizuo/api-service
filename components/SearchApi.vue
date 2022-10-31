<script lang="ts" setup>
const apiStore = useApiStore()
</script>

<template>
  <div relative w="400px" m="t-5" flex>
    <input
      id="input"
      v-model="apiStore.searchName"
      placeholder="查找 API 接口?"
      type="text" autocomplete="off"
      p="x-8 y-2"
      w-full
      text="center" bg="transparent"
      placeholder-light
      border="~ rounded gray-300"
      outline="none active:none"
    >
    <button
      absolute
      right-2
      top="1/2"
      class="-translate-y-1/2"
      i-carbon-search
      w-6 h-6
      bg-gray-300
    />
  </div>
</template>
