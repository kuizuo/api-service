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
  <div mt-2 bg-zinc-1 dark:bg-gray-8 p-4 flex="~ col" gap-3 text-sm>
    <p inline-flex items-center>
      <span w-20 text-right font-sans>接口地址：</span>
      <span ml-1 mr-2 text-purple hover:underline>{{ url }}</span>
      <Copy :result="url" />
    </p>

    <p inline-flex items-center>
      <span w-20 text-right font-sans>请求方式：</span>
      <span ml-1 text-purple>{{ method }}</span>
    </p>
    <p inline-flex items-center>
      <span w-20 text-right font-sans>返回格式：</span>
      <span ml-1 text-purple>{{ dataTypeMap[dataType] }}</span>
    </p>
    <p inline-flex items-center>
      <span w-20 text-right font-sans>请求示例：</span>
      <span ml-1 text-purple hover:underline>{{ urlExample }}</span>
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
          <tr v-for="param in params" :key="param.name" transition hover="bg-gray-1 dark:hover:bg-gray-8">
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
