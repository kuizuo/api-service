<script lang="ts" setup>
const { title, description } = useAppConfig()
useHead({
  titleTemplate: (titleChunk?: string) => {
    return titleChunk ? `${titleChunk} | API Service` : 'API Service'
  },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
  ],
  meta: [
    { name: 'keywords', content: 'nuxt, naive-ui, supabase, template, web' },
    { name: 'description', content: description },
    { name: 'referrer', content: 'no-referrer' },
    // open graph social image
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/og.png' },
    { property: 'og:image:width', content: '2000' },
    { property: 'og:image:height', content: '1000' },
    { property: 'og:site_name', content: title },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <UContainer>
      <NuxtPage />
    </UContainer>

    <UNotifications />
  </NuxtLayout>
</template>
