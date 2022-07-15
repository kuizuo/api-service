<template>
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
</template>
