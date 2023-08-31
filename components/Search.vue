<script setup lang="ts">
const apiStore = useApiStore()
const { searchName: query } = toRefs(apiStore)
</script>

<template>
  <UInput v-model="query" name="query" color="gray" class="!bg-transparent focus:ring-gray-500" variant="outline" placeholder="Search..." icon="i-heroicons-magnifying-glass-20-solid" :ui="{ icon: { trailing: { pointer: '' } } }">
    <template #trailing>
      <UButton
        v-show="query !== ''"
        color="gray"
        variant="link"
        icon="i-heroicons-x-mark-20-solid"
        :padded="false"
        @click="query = ''"
      />
    </template>
  </UInput>
</template>
