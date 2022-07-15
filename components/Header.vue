<template>
  <header class="background">
    <Nav />
    <Hero />
  </header>
</template>

<style>
.background{
  background: linear-gradient(
          45deg,
          hsl(200deg, 80%, 70%),
          hsl(190deg, 80%, 70%),
          hsl(250deg, 80%, 70%),
          hsl(320deg, 80%, 70%)
        );
        background-size: 200% 200%;
        animation: gradient-move 15s ease alternate infinite;
}

@keyframes gradient-move {
        0% {
          background-position: 0% 0%;
        }
        100% {
          background-position: 100% 100%;
        }
      }
</style>
