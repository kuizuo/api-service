<script lang='ts' setup>
const props = defineProps<{
  url: string
  method: string
  dataType: string
  urlExample: string
  params: IApi.Param[]
  response: any
}>()

const { url, method, dataType, urlExample } = toRefs(props)

const dataTypeMap = {
  img: '图片',
  text: '文本',
  json: 'JSON',
}
</script>

<template>
  <div py-1 flex="~ col" gap-3 text-sm font-sans>
    <div inline-flex gap-2 items-center>
      <span text-base>接口地址：</span>
      <span
        px-3 py-1 text-sm rounded hover:cursor-pointer
        :class="method === 'GET' ? 'text-lightBlue-4 bg-lightBlue-1' : 'text-green-4 bg-green-1'"
      >{{
        method
      }}</span>
      <span px-3 py-1 rounded bg-zinc-1 text-zinc-4 hover:cursor-pointer>{{ url }}</span>
      <Copy :result="url" />
    </div>

    <p inline-flex gap-2 items-center>
      <span text-base>返回格式：</span>
      <span px-3 py-1 text-sm bg-indigo-1 text-indigo-4 rounded hover:cursor-pointer>{{ dataTypeMap[dataType]
      }}</span>
    </p>
    <p inline-flex gap-2 items-center>
      <span text-base>请求示例：</span>
      <span px-3 py-1 text-sm bg-zinc-1 text-zinc-4 rounded hover:cursor-pointer>{{ urlExample }}</span>
    </p>
  </div>
  <div mt-4>
    <h3 pl-2 mb-2 text-base border="l-5 emerald">
      请求参数
    </h3>
    <div v-if="params.length > 0" w-full>
      <table class="table table-auto w-full border border-collapse">
        <thead>
          <tr>
            <th>参数名</th>
            <th>示例值</th>
            <th>类型</th>
            <th>描述</th>
            <th>是否必须</th>
          </tr>
          <tr v-for="param in params" :key="param.name" transition hover="bg-zinc-1 dark:hover:bg-gray-8">
            <td>{{ param.name }}</td>
            <td>{{ param.value }}</td>
            <td>{{ param.type }}</td>
            <td>{{ param.desc }}</td>
            <td>{{ param.required ? '是' : '否' }}</td>
          </tr>
        </thead>
      </table>
    </div>
  </div>
  <div mt-4>
    <h3 pl-2 text-base border="l-5 emerald">
      响应示例
    </h3>
    <div mt-2 h-auto min-h-10 w-full relative bg-zinc-1 dark:bg-gray-8>
      <div class="response thin-scrollbar" overflow-x-auto>
        <div v-if="dataType === 'json'">
          <CodeView :code="response" language="json" />
        </div>
        <div v-else-if="dataType === 'img'">
          <img :src="urlExample">
        </div>
        <div v-else>
          <div p-2 font-sans text-base>
            {{ response }}
          </div>
        </div>
      </div>
      <div v-if="response && dataType !== 'img'" absolute top-2 right-2>
        <Copy :result="response" />
      </div>
    </div>
  </div>
</template>

<style scoped>
table tr {
  text-align: left;
  border-collapse: collapse;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(229, 231, 235, 1);
}

table tr th {
  font-weight: 500;
}

table tr td,
table tr th {
  padding: 0.25rem 0.75rem;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(229, 231, 235, 1)
}

table tr th {
  font-size: 0.9rem;
  background-color: rgba(243, 244, 246, 1);
}

.dark table tr th {
  background-color: rgba(31, 41, 55, 1);
}

table tr td {
  font-size: small;
}
</style>
