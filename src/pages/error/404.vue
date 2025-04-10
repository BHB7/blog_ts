<template>
  <div class=" w-full h-lvh bg-primary justify-center flex place-items-center">
    <div
      class=" bg-primary-content justify-center flex flex-col place-items-center drop-shadow-2xl card h-[300px] card-border border-solid border-border">
      <div class="flex flex-row">
        <h1 class="flex-shrink mx-4 text-5xl text-error">404</h1>
      </div>
      <div class="flex flex-row my-10">
        <h1 class="flex-shrink mx-4 text-[20px] font-display text-error-content">
          我嘞个擦！页面不见鸟~~
        </h1>
      </div>
      <div class="flex flex-row">
        <button onclick="reverse();" class=" btn btn-error px-10" @click="$router.replace('/')">回到首页</button>
      </div>

      <!-- REMOVE THIS  -->
      <div class="fex flex-row ">
        <a href="https://github.com/bopv2" class="hover:text-slate-700 text-[30px] hover:cursor-pointer"><i
            class="bi bi-github"></i></a> &nbsp;
        <a href="https://paypal.me/bopv2" class="hover:text-slate-700 text-[30px] hover:cursor-pointer"><i
            class="bi bi-paypal"></i></a>
      </div>
      <!-- REMOVE THIS -->
    </div>

  </div>
</template>
