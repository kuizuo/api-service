<template>
  <footer bg-gray-7 text-white px-12 py-8 font-sans>
    <div flex="~ col" md:flex="~ row" gap-5>
      <div w="full" md:w="3/4">
        <h4 font-bold text-xl>
          关于本项目
        </h4>
        <p text-sm mt-3>
          KZ API 是 <a href="https://kuizuo.cn" underline underline-dashed underline-lightBlue>kuizuo</a> 整理稳定、快速、好用的 API 接口，供各大开发者使用。
        </p>
        <p text-sm mt-2>
          KZ API 接口服务平台接口进行封装维护，提供接口文档，接口状态等相关信息。并有一套监控系统，可以监控接口的调用情况，接口状态等。
        </p>
        <p text-sm mt-2>
          API 接口均来自网络，如有侵权，请联系作者删除！
        </p>
      </div>
      <div w="full" md:w="1/4">
        <h4 font-bold text-xl>
          相关链接
        </h4>
        <ul mt-3>
          <li>
            <a href="https://kuizuo.cn" hover="underline underline-lightBlue">愧怍的小站</a>
          </li>
        </ul>
      </div>
    </div>
    <div mt-8 text-center font-sans>
      Copyright © {{ new Date().getFullYear() }} 愧怍 Built with Nuxt.js
    </div>
  </footer>
</template>

