import { defineStore } from 'pinia'

export const useApiStore = defineStore('api', () => {
  const router = useRouter()

  const apiList = ref<IApi.Info[]>([])
  const searchName = ref('')

  const list = computed(() => { return apiList.value?.filter(data => data.name.match(new RegExp(searchName.value, 'i'))) ?? [] })
  const count = computed(() => { return apiList.value.length })

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
