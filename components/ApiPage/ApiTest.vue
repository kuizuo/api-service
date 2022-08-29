<script lang="ts" setup>
const props = defineProps<{
  url: string
  method: string
  dataType: string
  urlExample: string
  params: IApi.Param[]
  response: string
}>()

const { method, params, dataType } = props
let response = $ref(props.response)
const urlExample = $ref(props.urlExample)

async function sendApi() {
  response = 'Loadding...'
  if (dataType === 'img')
    response = await (await fetch(urlExample, { method })).text()

  else if (dataType === 'json')
    response = await (await fetch(urlExample, { method })).json()

  else if (dataType === 'text')
    response = await (await fetch(urlExample, { method })).text()

  else
    response = await (await fetch(urlExample, { method })).text()

  console.log(urlExample, method, params, dataType, response)
}
</script>

<template>
  <div>
    <div class="api-url-panel" flex font-sans>
      <div class="api-url-ground" flex flex-1 gap-2 bg-zinc-1 rounded>
        <select id="" v-model="method" name="method" p-2 bg-transparent outline-none cursor-pointer>
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
          <input v-model="urlExample" bg-transparent type="text" w-full border-0 outline-none>
        </span>
      </div>
      <button ml-2 w-20 text-center bg-blue-4 text-white font-semibold rounded @click="sendApi">
        发送
      </button>
    </div>
    <!-- <hr class="my-4 border-none bg-[#e6e6e6] h-1px">
    <div class="api-param" /> -->
    <hr class="my-4 border-none bg-[#e6e6e6] h-1px">
    <div class="api-response">
      <CodeView :code="response" language="json" />
    </div>
  </div>
</template>

<style scoped>
</style>
