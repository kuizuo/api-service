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
    <NuxtPage />

    <UNotifications />
  </NuxtLayout>
</template>

