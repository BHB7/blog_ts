<script setup lang="ts">
import Theme from '@/components/btn/theme/index.vue'
import SidebarMenu from '@/components/menu/sidebarMenu.vue'
import LineMdHomeTwotone from '~icons/line-md/home-twotone'
import MdiPost from '~icons/mdi/post-outline'
import LineMdAccount from '~icons/line-md/account';
import useLayoutHook from './hooks/useLayoutHooks';
import { ref } from 'vue';
const menuList = [
  { icon: LineMdHomeTwotone, path: '/', name: '总览' },
  { icon: MdiPost, path: '/admin/articles', name: '文章管理' },
  { icon: LineMdAccount, path: '/login', name: '用户管理' },
]

const { getUserInfo, userData } = useLayoutHook()
getUserInfo()

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
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-avatar :size="35" src="https://empty" @error="">
                  <img :src="userData?.imgurl" />
                </el-avatar>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.push('/admin/user')">个人信息</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <Theme></Theme>
          </ul>
          <ul class="dropdown menu w-52 rounded-box bg-base-100 shadow-sm" popover id="popover-1">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </div>
      <!-- Page content here -->
      <div class="fixed top-16 h-full w-full">
        <div class="w-full h-full flex">
          <!-- pc 菜单 -->
          <SidebarMenu :list="menuList" class="hidden lg:flex w-50" />
          <!-- 内容 -->
          <div class="w-full overflow-auto py-1"
            :class="{ 'px-4 pt-4': $route.fullPath === '/admin/home' || $route.fullPath === '/admin/articles' }">
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
