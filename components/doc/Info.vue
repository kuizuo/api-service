<script lang='ts' setup>
import Result from './Result.vue'

const props = defineProps<{
  url: string
  path: string
  method: string
  dataType: 'img' | 'text' | 'json'
  params: IApi.Param[]
}>()

const urlExample = ref(`${props.url}${props.params.length ? '?' : ''}${props.params.filter(p => p.required).map(param => `${param.key}=${param.value}`).join('&')}`)
const dataTypeMap = {
  img: '图片',
  text: '文本',
  json: 'JSON',
}

const columns = [{
  key: 'key',
  label: '名称',
}, {
  key: 'value',
  label: '示例值',
}, {
  key: 'type',
  label: '类型',
}, {
  key: 'required',
  label: '必填',
}, {
  key: 'desc',
  label: '描述',
}]

const data = props.params

const toast = useToast()
const { copy, copied } = useClipboard({ })

function handleCopy() {
  copy(props.url)
  toast.add({
    title: '复制成功',
    timeout: 2000,
  })
}
</script>

<template>
  <div class="py-1 flex flex-col gap-3 text-sm font-sans">
    <div class="inline-flex gap-2 items-center">
      <span class="min-w-[4em]">接口地址</span>

      <UBadge :color="method === 'GET' ? 'green' : 'blue'" size="md">
        {{ method }}
      </UBadge>
      <UBadge color="cyan" size="md">
        {{ url }}
      </UBadge>
      <UIcon :name="!copied ? 'i-carbon-copy-link' : 'i-carbon-checkmark'" class="cursor-pointer text-gray-500" @click="handleCopy" />
    </div>
    <p class="inline-flex gap-2 items-center">
      <span class="min-w-[4em]">请求示例</span>
      <UBadge color="cyan" size="md">
        {{ urlExample }}
      </UBadge>
    </p>
    <p class="inline-flex gap-2 items-center">
      <span class="min-w-[4em]">返回格式</span>
      <UBadge color="indigo" size="md">
        {{ dataTypeMap[dataType] }}
      </UBadge>
    </p>
  </div>
  <div v-if="params.length > 0">
    <div
      class="relative flex items-center my-2 text-center truncate
    before:content-[''] before:top-[50%] before:w-[50%] before:translate-y-[50%] before:border-t before:border-gray-200 dark:border-gray-700)
    after:content-[''] after:top-[50%] after:w-[50%] after:translate-y-[50%] after:border-t after:border-gray-200 dark:border-gray-700)
    "
    >
      <span class="px-2 text-gray-400 text-sm">请求参数</span>
    </div>
    <div class="border rounded dark:border-gray-600 border-collapse">
      <UTable :columns="columns" :rows="data" />
    </div>
  </div>
  <Result v-bind="{ dataType, urlExample }" />
</template>
