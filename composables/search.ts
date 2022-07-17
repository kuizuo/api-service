import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
  const name = ref('')

  function getName() {
    return name.value
  }

  function setName(value: string) {
    name.value = value
  }

  return {
    name,
    getName,
    setName,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
