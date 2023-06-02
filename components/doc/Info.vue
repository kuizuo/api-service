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
</script>

<template>
  <div py-1 flex="~ col" gap-3 text-sm font-sans>
    <div inline-flex gap-2 items-center>
      <span text-base>接口地址</span>
      <span
        px-3 py-1 text-sm rounded hover:cursor-pointer
        :class="method === 'GET' ? 'text-lightBlue-4 bg-lightBlue-1' : 'text-green-4 bg-green-1'"
      >{{
        method
      }}</span>
      <span px-3 py-1 rounded text-zinc-7 bg-blue-1 hover:cursor-pointer>{{ url }}</span>
      <Copy :result="url" />
    </div>
    <p inline-flex gap-2 items-center>
      <span text-base>请求示例</span>
      <span px-3 py-1 text-sm text-zinc-7 bg-blue-1 rounded hover:cursor-pointer>{{ urlExample }}</span>
    </p>
    <p inline-flex gap-2 items-center>
      <span text-base>返回格式</span>
      <span px-3 py-1 text-sm bg-indigo-1 bg-blue-1 text-indigo-4 rounded hover:cursor-pointer>{{ dataTypeMap[dataType]
      }}</span>
    </p>
  </div>
  <div v-if="params.length > 0">
    <Divider title="请求参数" />
    <div mt-4 w-full>
      <table class="table table-auto w-full border dark:border-gray-6 border-collapse">
        <thead>
          <tr>
            <th>名称</th>
            <th>示例值</th>
            <th>类型</th>
            <th>必填</th>
            <th>描述</th>
          </tr>
          <tr v-for="param in params" :key="param.key" transition hover="dark:hover:bg-gray-8">
            <td>{{ param.key }}</td>
            <td>{{ param.value }}</td>
            <td>{{ param.type }}</td>
            <td>{{ param.required ? '是' : '否' }}</td>
            <td>{{ param.desc }}</td>
          </tr>
        </thead>
      </table>
    </div>
  </div>

  <div>
    <Divider title="响应结果" />
    <Result v-bind="{ dataType, urlExample }" />
  </div>
</template>

<style scoped>
table tr {
  text-align: left;
  border-collapse: collapse;
  border-width: 1px solid rgba(229, 231, 235, 1);
}

table tr td,
table tr th {
  padding: 0.5rem 0.8rem;
  border-width: 1px solid rgba(229, 231, 235, 1);
}

table tr th {
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.6rem 0.8rem;
}

table tr th {
  background-color: #dcf0fa;
}

.dark table tr th {
  background-color: rgb(28, 39, 40);
}

table tr:hover {
  background-color: #dcf0fa;
}

table tr td {
  font-size: 0.875rem;
}
</style>
