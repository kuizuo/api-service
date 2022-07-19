import { acceptHMRUpdate, defineStore } from 'pinia'

export const useApiStore = defineStore('api', () => {
  const apiList = ref<IApi.Info[]>([])
  const searchName = ref('')
  const list = computed(() => { return apiList.value?.filter(data => data.name.match(new RegExp(searchName.value, 'i'))) ?? [] })
  const count = computed(() => { return apiList.value.length })

  const router = useRouter()
  watch(searchName, (val) => {
    if (val)
      router.push({ query: { q: val } })
    else
      router.push({ query: {} })
  })

  return {
    searchName,
    apiList,
    list,
    count,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useApiStore, import.meta.hot))
