<script lang='ts' setup>
import { Url } from '~/utils/url'

const props = defineProps<{
  info: IApi.Doc
}>()

const { params, path, method, dataType } = props.info

const url = ref(Url(path).href)

const urlExample = ref(`${url.value}${params.length > 0 ? '?' : ''}${params.map(param => `${param.key}=${param.value}`).join('&')}`)

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

const data = params

const toast = useToast()
const { copy } = useClipboard()

function handleCopy() {
  copy(url.value)
  toast.add({
    title: '复制成功',
    timeout: 2000,
  })
}
</script>

<template>
  <div class="py-1 flex flex-col gap-3 text-sm font-sans">
    <div class=" gap-2 flex items-center">
      <span class="min-w-[4em]">接口地址</span>
      <UBadge :color="method === 'GET' ? 'green' : 'blue'" size="md">
        {{ method }}
      </UBadge>
      <UBadge color="cyan" size="md" class="cursor-pointer" @click="handleCopy">
        {{ url }}
      </UBadge>
    </div>
    <p class="gap-2 flex items-center">
      <span class="min-w-[4em]">请求示例</span>
      <UBadge color="cyan" size="md">
        {{ urlExample }}
      </UBadge>
    </p>
    <p class="gap-2 flex items-center">
      <span class="min-w-[4em]">返回格式</span>
      <UBadge color="indigo" size="md">
        {{ dataTypeMap[dataType] }}
      </UBadge>
    </p>
  </div>
  <div v-if="params.length > 0">
    <div
      class="relative flex items-center my-2 text-center text-gray-400 text-sm truncate
    before:content-[''] before:top-[50%] before:w-[50%] before:translate-y-[50%] before:border-t before:border-dashed before:border-gray-300 dark:border-gray-800)
    after:content-[''] after:top-[50%] after:w-[50%] after:translate-y-[50%] after:border-t after:border-dashed after:border-gray-300 dark:border-gray-800)
    "
    >
      <div class="flex justify-center items-center gap-1 mx-3 text-base">
        <span>请求参数</span>
      </div>
    </div>
    <div class="border rounded dark:border-gray-600 border-collapse">
      <UTable :columns="columns" :rows="data" />
    </div>
  </div>
  <DocResult :data-type="dataType" :url="urlExample" />
</template>
