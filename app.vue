<script setup>
useHead({
  title: 'KZ API',
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/logo.svg',
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  height: 100%;
  margin: 0;
  padding: 0;
  --at-apply: bg-gradient-to-b from-[#dbf4ff] to-[#fff1f1] dark:(from-[#433b8c] to-[#10243e])
}

html.dark {
  background: #222;
  color: white;
}
</style>
