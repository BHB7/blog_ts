<script setup lang="ts">
import Theme from '@/components/btn/theme/index.vue'
import SidebarMenu from '@/components/menu/sidebarMenu.vue'
import LineMdHomeTwotone from '~icons/line-md/home-twotone'
import MdiPost from '~icons/mdi/post-outline'
import MdiInformation from '~icons/mdi/information-outline'
const menuList = [
  { icon: LineMdHomeTwotone, path: '/', name: '总览' },
  { icon: MdiPost, path: '/admin/articles', name: '文章管理' },
  { icon: MdiInformation, path: '/login', name: '关于' },
]
</script>

<template>
  <div class="drawer">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="navbar bg-base-300 w-full z-50">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              class="inline-block h-6 w-6 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </div>
        <div class="mx-2 flex-1 px-2">文章后台管理</div>
        <div class="hidden flex-none lg:block">

          <ul class="menu menu-horizontal space-x-4 items-center">
            <div class="avatar avatar-online">
              <div class="w-10 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>

            <Theme></Theme>
          </ul>
        </div>
      </div>
      <!-- Page content here -->
      <div class="fixed top-16 h-full w-full">
        <div class="w-full h-full flex">
          <!-- pc 菜单 -->
          <SidebarMenu :list="menuList" class="hidden lg:flex w-50" />
          <!-- 内容 -->
          <div class="w-full overflow-auto py-1" :class="{ 'pl-4 pt-4': $route.fullPath !== '/admin/posts' }">
            <RouterView></RouterView>
          </div>
        </div>
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 min-h-full w-80 p-4">
        <Theme></Theme>
        <SidebarMenu :is-drawer="true" :list="menuList" class="w-full" />
      </ul>
    </div>
  </div>
</template>
