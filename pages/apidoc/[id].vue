<script setup>
const router = useRoute()
const { id } = router.params

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <div>
    <div>
      <NuxtLink
        class="btn m-3 text-sm"
        to="/"
      >
        Back
      </NuxtLink>
    </div>
    id:{{ id }}
  </div>
</template>
