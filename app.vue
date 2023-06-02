<script setup>
useHead({
  title: 'API Service',
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/logo.svg',
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html {
  margin: 0;
  padding: 0;
  background-size:cover;
  background-attachment:fixed;
  --at-apply: "bg-gradient-to-b from-[#dbf4ff] to-[#fff1f1] dark:(from-[#433b8c] to-[#10243e])";
}

html.dark {
  background: #222;
  color: white;
}
</style>
