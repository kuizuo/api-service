<script setup lang="ts">
definePageMeta({
  layout: 'markdown',
})
</script>

<template>
  <div class="markdown" font-sans>
    <ContentDoc v-slot="{ doc }" path="/about">
      <div class="text-center">
        <h1 text-2xl>
          {{ doc.title }}
        </h1>
      </div>
      <ContentRenderer :value="doc" />
    </ContentDoc>
  </div>
</template>

<style>
.markdown h2>a,
.markdown h3>a {
  text-decoration-line: none;
  --at-apply: "relative font-sans text-2xl no-underline hover:(underline underline-dashed)";
}
</style>
