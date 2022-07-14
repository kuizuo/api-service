<script setup lang="ts">
// const apiList = useFetch('/api/api-list')
const apiList = ref([{
  id: '1',
  name: '获取QQ头像',
  desc: '根据QQ号获取头像根据QQ号获取头像根据QQ号获取头像根据QQ号获取头像根据QQ号获取头像根据QQ号获取头像根据QQ号获取头像根据QQ号获取头像',
  href: '/apidoc/1',
  status: true,
}, {
  id: '2',
  name: '获取QQ头像',
  desc: '根据QQ号获取头像',
  href: '/apidoc/2',
  status: true,
}, {
  id: '3',
  name: '获取QQ头像',
  desc: '根据QQ号获取头像',
  href: '/apidoc/3',
  status: false,
}])
</script>

<template>
  <div>
    <ApiList :data="apiList" />
  </div>
</template>
