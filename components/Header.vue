<template>
  <header class="background">
    <nav px-4 text-white flex="~ gap-2">
      <NuxtLink to="/" flex gap-2 items-center>
        <img src="/logo.png" h-8>
        <div font-mono font-bold>
          KZ API
        </div>
      </NuxtLink>

      <div flex-auto />

      <div text="xl" my-4 flex justify-center gap-3>
        <DarkToggle />
        <a i-carbon-logo-github href="https://github.com/kuizuo/api-service" target="_blank" />
      </div>
    </nav>
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
