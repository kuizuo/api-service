<template>
  <div>
    <BaseNav />
    <div class="max-w-2xl px-4 py-10 m-auto bg-white sm:px-8 sm:shadow dark:bg-gray-800 sm:rounded">
      <main class="prose prose-gray dark:prose-invert max-w-none">
        <slot />
      </main>
    </div>
    <BaseFooter />
  </div>
</template>

<style>
.prose h2 a,
.prose h3 a {
  --at-apply: "no-underline";
}

.prose h2 a:hover,
.prose h3 a:hover {
  --at-apply: "border-b border-neutral-600 dark:border-neutral-300";
}
</style>
