<script setup lang="ts">
import Theme from '@/components/btn/theme/index.vue'
import LineMdHomeTwotone from '~icons/line-md/home-twotone';
// import { showMsg } from '@/utils/showMsg'
// import { onMounted } from 'vue';
// // onMounted(() => {
// //   showMsg('建议使用PC进行访问体验更佳', 'warning', 5000)
// // })
</script>

<template>
  <div class="drawer">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="navbar bg-base-300 w-full">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              class="inline-block h-6 w-6 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
              </path>
            </svg>
          </label>
        </div>
        <div class="mx-2 flex-1 px-2">文章后台管理</div>
        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal">
            <!-- Navbar menu content here -->
            <!-- <li><a>Navbar Item 1</a></li>
            <li><a>Navbar Item 2</a></li> -->
            <!--  -->
            <Theme></Theme>
          </ul>
        </div>
      </div>
      <!-- Page content here -->
      <div class=" fixed top-16 h-full w-full">
        <div class="w-full h-full flex">
          <!-- pc 菜单 -->
          <ul class="menu p-5  menu-vertical bg-base-200  text-md h-full w-56 hidden lg:flex">
            <li>
              <LineMdHomeTwotone /><a>首页</a>
            </li>
            <li><a>文章管理</a></li>
            <li><a>关于</a></li>
          </ul>
          <!-- 内容 -->
          <div class="w-full lg:p-10 p-4 overflow-auto py-1">
            <RouterView></RouterView>
          </div>
        </div>
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 min-h-full w-80 p-4">
        <Theme></Theme>
        <!-- Sidebar content here -->
        <li><a>用户管理</a></li>
        <li><a>文章管理</a></li>
        <li><a>关于</a></li>
      </ul>
    </div>
  </div>
</template>
