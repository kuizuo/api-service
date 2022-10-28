<script lang="ts" setup>
import cloneDeep from '~/utils/cloneDeep'

const props = defineProps<{
  url: string
  method: string
  dataType: string
  params: IApi.Param[]
  response: string
}>()

const { url, method, params, dataType } = props
let response = $ref(props.response)

let idTicker = $ref(0)

let workingParams = $ref<IApi.Param[]>([
  ...cloneDeep(params),
])

workingParams = workingParams.map((p) => {
  return { ...p, active: true, id: idTicker++ }
})

let reqUrl = $ref(genUrl(workingParams))

function genUrl(params: IApi.Param[]) {
  const querys = params
    .filter(p => p.active && p.key)
    .map(p => `${p.key ?? ''}=${p.value ?? ''}`)
    .join('&')

  return `${url}${querys ? '?' : ''}${querys}`
}

const addParam = () => {
  workingParams.push({
    id: idTicker++,
    key: '',
    value: '',
    active: true,
  })
}

const updateParam = async (index: number, param: IApi.Param) => {
  workingParams[index] = param

  if (workingParams[workingParams.length - 1].key !== '') {
    workingParams.push({
      id: idTicker++,
      key: '',
      value: '',
      active: true,
    })
  }

  reqUrl = genUrl(workingParams)
}

const deleteParam = (index: number) => {
  if (index === workingParams.length - 1)
    return

  workingParams.splice(index, 1)
  reqUrl = genUrl(workingParams)
}

const handleReqUrl = (newUrl: string) => {
  const list = newUrl.split('?')[1].split('&')
  const params = list.map((item) => {
    const [key, value] = item.split('=')
    return {
      id: idTicker++,
      key,
      value,
      active: true,
    }
  })

  workingParams = params
  addParam()
}

async function sendApi() {
  response = 'Loading...'
  if (dataType === 'img')
    response = await (await fetch(reqUrl, { method })).text()

  else if (dataType === 'json')
    response = await (await fetch(reqUrl, { method })).json()

  else if (dataType === 'text')
    response = await (await fetch(reqUrl, { method })).text()

  else
    response = await (await fetch(reqUrl, { method })).text()
}

addParam()
</script>

<template>
  <div>
    <div class="api-url-panel" flex font-sans>
      <div class="api-url-ground" flex flex-1 gap-2 bg-zinc-1 dark:bg-gray-8 rounded>
        <select v-model="method" name="method" p-2 bg-transparent outline-none cursor-pointer>
          <option value="GET">
            GET
          </option>
          <option value="POST">
            POST
          </option>
          <option value="PUT">
            PUT
          </option>
          <option value="PATCH">
            PATCH
          </option>
          <option value="DELETE">
            DELETE
          </option>
        </select>
        <span class="flex-1 p-2 border-l-1 border-[#e6e6e6]">
          <input v-model="reqUrl" bg-transparent type="text" w-full border-0 outline-none @input="handleReqUrl(reqUrl)">
        </span>
      </div>
      <button ml-2 w-20 text-center bg-blue-4 text-white font-semibold rounded @click="sendApi">
        发送
      </button>
    </div>
    <hr class="my-4 border-none bg-[#e6e6e6] dark:bg-[#1f2937] h-1px">
    <div class="api-param">
      <div class="api-table-container rounded">
        <table class="api-table api-table-border">
          <thead>
            <tr class="api-table-th">
              <td class="api-table-td" style="width: 50px;">
                <span class="api-table-cell" />
              </td>
              <td class="api-table-td" style="width: auto">
                <span class="api-table-cell ">参数名</span>
              </td>
              <td class="api-table-td" style="width: auto">
                <span class="api-table-cell">参数值</span>
              </td>
              <td class="api-table-td" style="width: 30px;">
                <span class="api-table-cell" />
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(param, index) in workingParams" :key="`param-${param.id}-${index}`" class="api-table-tr">
              <td class="api-table-td">
                <div class="flex justify-center">
                  <button
                    class="api-switch small" :class="{ checked: param.active }" @click="updateParam(index, {
                      id: param.id,
                      key: param.key,
                      value: param.value,
                      active: !param.active,
                    })"
                  >
                    <span class="cycle" />
                  </button>
                </div>
              </td>
              <td class="api-table-td">
                <div class="api-table-cell">
                  <div class="api-textarea-wrapper" style="height: 24px;">
                    <input
                      v-model="param.key" spellcheck="false" class="api-textarea"
                      style="height: 24px; word-break: break-all; overflow: hidden;" @input="
                        updateParam(index, {
                          id: param.id,
                          key: param.key,
                          value: param.value,
                          active: param.active ?? true,
                        })
                      "
                    >
                  </div>
                </div>
              </td>
              <td class="api-table-td">
                <div class="api-table-cell">
                  <div class="api-textarea-wrapper" style="height: 24px;">
                    <input
                      v-model="param.value" spellcheck="false" class="api-textarea"
                      style="height: 24px; word-break: break-all;" @input="updateParam(index, {
                        id: param.id,
                        key: param.key,
                        value: param.value,
                        active: param.active ?? true,
                      })"
                    >
                  </div>
                </div>
              </td>
              <td class="api-table-td">
                <div class="api-table-cell flex justify-center">
                  <div class="cursor-pointer text-red" @click="deleteParam(index)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="svg-icons"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <hr class="my-4 border-none bg-gray-2 dark:bg-gray-6 h-1px">
    <div class="api-response">
      <CodeView :code="response" language="json" />
    </div>
  </div>
</template>

<style scoped>
.api-textarea {
  box-sizing: border-box;
  width: 100%;
  outline: none;
  padding: 2px 4px;
  border-radius: 4px;
  overflow-y: hidden;
  border-width: 0;
  font-size: 12px;
  font-family: PingFang SC;
  resize: none;
  top: 0;
  left: 0;
  overflow: auto;
  --at-apply: "bg-gray-1 dark:bg-gray-8";
}

.api-textarea-wrapper {
  width: 100%;
  position: relative;
}

.api-switch {
  width: 36px;
  height: 20px;
  position: relative;
  background-color: #e9e9e9;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  vertical-align: middle;
  overflow: hidden;
}

.api-switch .cycle {
  width: 15px;
  height: 15px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 2px;
  border-radius: 50%;
  background-color: #fff;
  overflow: hidden;
  transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s;
}

.api-switch .cycle {
  left: 0;
}

.api-switch.checked {
  background-color: #287eff;
}

.api-switch.checked .cycle {
  left: auto;
  right: 0;
}

.api-switch.small {
  width: 24px;
  height: 14px;
  border-radius: 7px;
}

.api-switch.small .cycle {
  width: 10px;
  height: 10px;
}

.api-switch.disabled {
  cursor: not-allowed;
  background-color: #f2f3f5;
}

.api-switch.disabled.checked {
  background-color: #94bfff;
}

.api-table {
  table-layout: fixed;
  display: table;
  border-collapse: collapse;
  width: 100%;
}

.api-table .api-table-th {
  border-bottom: 1px solid #ebeef5;
}

.api-table .api-table-th td {
  font-weight: 400;
  position: relative;
  text-align: center;
  padding: 4px 0;
  --at-apply: "text-gray-8 bg-gray-1 dark:text-gray-2 dark:bg-gray-8";
}

.api-table .api-table-td {
  box-sizing: border-box;
  vertical-align: middle;
  position: relative;
  word-break: break-all;
  font-size: 14px;
  --at-apply: "text-gray-5 dark:text-gray-2";
}

tbody td .api-table-cell {
  padding: 4px 1px;
}

.api-table .td-mask {
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: var(--bgr1);
}

.api-table .td-selection {
  white-space: nowrap;
  text-align: center;
}

.api-table .td-scale {
  position: absolute;
  top: 0;
  z-index: 101;
  width: 4px;
  height: 100%;
  cursor: col-resize;
}

.api-table .td-scale.scaling,
.api-table .td-scale:hover {
  background-color: #409eff;
}

.api-table.api-table-border,
.api-table.api-table-border td {
  --at-apply: "b-1 b-gray-2 dark:b-gray-6";
}
</style>
