<script setup lang="ts">
import type { IApiDoc } from '~~/types/data'

const router = useRoute()
const id = router.params.id as string

const { copy, copied } = useClipboard({ })

const location = useBrowserLocation()
const origin = location.value.origin ?? ''

const { data } = await useAsyncData<IApiDoc>(id, () => queryContent<IApiDoc>(id).findOne())
const { name, desc, params, path, method, returnType, example } = data.value
const url = origin + path
const urlExample = origin + example
const { data: response } = useFetch(urlExample)
</script>

<template>
  <div mb-10>
    <div pb1 mb2 border="b-1 gray-1">
      <div class="flex justify-between items-center">
        <h2 text-2xl font-600 mr-1 inline-flex items-center gap-1>
          {{ name }}
          <i icon-btn i-carbon-checkmark-filled text-green />
        </h2>

        <NuxtLink
          class="btn text-sm"
          target="_blank"
          :to="urlExample"
        >
          测试一下
        </NuxtLink>
      </div>
      <p mt-2 p-4 text-sm border="l-5 blue">
        {{ desc }}
      </p>
    </div>
    <div>
      <h3 pl-2 text-base border="l-5 emerald">
        基本信息
      </h3>
      <div mt-2 bg-zinc-1 dark:bg-gray-8 p-4 flex="~ col" gap-3 text-sm>
        <p inline-flex items-center>
          <span w-20 text-right font-sans>接口地址：</span>
          <span ml-1 text-purple>{{ url }}</span>
          <span v-if="!copied" ml-2 icon-btn i-carbon-copy @click="copy(url)" />
          <span v-if="copied" ml-2 icon-btn i-carbon-checkmark text-green />
        </p>
        <p inline-flex items-center>
          <span w-20 text-right font-sans>请求方式：</span>
          <span ml-1 text-purple>{{ method }}</span>
        </p>
        <p inline-flex items-center>
          <span w-20 text-right font-sans>返回格式：</span>
          <span ml-1 text-purple>{{ returnType }}</span>
        </p>
        <p inline-flex items-center>
          <span w-20 text-right font-sans>请求示例：</span>
          <span ml-1 text-purple>{{ urlExample }}</span>
        </p>
      </div>
    </div>
    <div mt-4>
      <h3 pl-2 text-base border="l-5 emerald">
        请求参数
      </h3>
      <div mt-2 w-full>
        <table class="table table-auto w-full border border-collapse">
          <thead>
            <tr>
              <th>参数名</th>
              <th>示例值</th>
              <th>类型</th>
              <th>描述</th>
              <th>是否必须</th>
            </tr>
            <tr
              v-for="param in params" :key="param.name"
              transition
              hover="bg-gray-1 dark:hover:bg-gray-8"
            >
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
      <div mt-2 h-auto>
        <div v-if="returnType === 'JSON'">
          <JsonView :code="response" />
        </div>
        <div v-else-if="returnType === 'IMG'">
          <img :src="urlExample">
        </div>
        <div v-else>
          <div bg-zinc-1 p-2 font-sans text-base>
            {{ response }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
table tr {
  text-align:left;
  @apply border-collapse border-1 border-gray-2;
}

table tr th {
  font-weight: 500;
}

table tr td, table tr th {
  padding: 0.25rem 0.75rem;
  @apply  border-1 border-gray-2;
}

table tr th{
  font-size:0.9rem;
  @apply bg-coolGray-1 dark:bg-gray-8;
}

table tr td {
  font-size: small;
}
</style>
