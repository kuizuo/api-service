<script setup lang="ts">
const name = ref('')

const router = useRouter()
const go = () => {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}
</script>

<template>
  <div relative w="400px" m="t-5" flex>
    <input
      id="input"
      v-model="name"
      placeholder="查找 API 接口?"
      type="text" autocomplete="off"
      p="x-8 y-2"
      w-full
      text="center" bg="transparent"
      placeholder-light
      border="~ rounded gray-300"
      outline="none active:none"
      @keydown.enter="go"
    >
    <button
      absolute
      right-2
      top="1/2"
      class="-translate-y-1/2"
      i-carbon-search
      w-6 h-6
      bg-gray-300
      @click="go"
    />
  </div>
</template>
