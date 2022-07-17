<template>
  <div class="h-full">
    <header class="background">
      <Nav />
    </header>

    <main class="container max-w-5xl mx-auto py-10 px-10">
      <slot />
    </main>
    <Footer />
  </div>
</template>
