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
</script>

<template>
  <div py-1 flex="~ col" gap-3 text-sm font-sans>
    <div inline-flex gap-2 items-center>
      <span text-base>接口地址</span>

      <UBadge :color="method === 'GET' ? 'green' : 'blue'" size="md">
        {{ method }}
      </UBadge>
      <UBadge color="cyan" size="md">
        {{ url }}
      </UBadge>
      <Copy :result="url" />
    </div>
    <p inline-flex gap-2 items-center>
      <span text-base>请求示例</span>
      <UBadge color="cyan" size="md">
        {{ urlExample }}
      </UBadge>
    </p>
    <p inline-flex gap-2 items-center>
      <span text-base>返回格式</span>
      <UBadge color="indigo" size="md">
        {{ dataTypeMap[dataType] }}
      </UBadge>
    </p>
  </div>
  <div v-if="params.length > 0">
    <div
      class="relative flex items-center my-2 text-center truncate
    before:(content-none top-50% w-50% translate-y-50% b-t-1 b-gray-2 dark:b-gray-7)
    after:(content-none top-50% w-50% translate-y-50% b-t-1 b-gray-2 dark:b-gray-7)
    "
    >
      <span px-2 text-gray-4 text-sm>请求参数</span>
    </div>
    <div border dark:border-gray-6 border-collapse>
      <UTable :columns="columns" :rows="data" />
    </div>
  </div>
  <Result v-bind="{ dataType, urlExample }" />
</template>
