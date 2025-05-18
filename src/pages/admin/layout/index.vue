<script setup lang="ts">
import Theme from '@/components/btn/theme/index.vue'
import SidebarMenu from '@/components/menu/sidebarMenu.vue'
import LineMdMenu from '~icons/line-md/menu'
import LineMdFileDocument from '~icons/line-md/file-document'
import LineMdAccountSmall from '~icons/line-md/account-small'
import useLayoutHook from './hooks/useLayoutHooks';
import { ref } from 'vue';
const menuList = [
  {
    name: '文章管理',
    icon: LineMdFileDocument,
    children: [
      { name: '分类', path: 'article/categorys' },
      { name: '标签', path: 'article/tags' }
    ]
  }, {
    name: '我的',
    icon: LineMdAccountSmall,
    children: [
      { name: '相册', path: 'account/photos' },
      { name: '音乐', path: 'account/links' }
    ]
  },
  {
    name: '本站',
    icon: LineMdAccountSmall,
    children: [
      { name: '留言', path: 'local/guestbook' },
      { name: '友链', path: 'local/links' }
    ]
  },

]
const drawer = ref(false)
const { getUserInfo, userData } = useLayoutHook()
getUserInfo()
</script>

<template>

  <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
  <div class="flex flex-col">
    <!-- Navbar -->
    <div class="navbar bg-base-300 w-full z-50">
      <div class="flex-none">
        <button @click="drawer = true" class="btn">
          <LineMdMenu />
        </button>
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
    <div class="  h-full w-full">
      <div class="w-full h-full flex">
        <!-- 内容 -->
        <div class="w-full overflow-auto py-1"
          :class="{ 'px-4 pt-4': $route.fullPath === '/admin/home' || $route.fullPath === '/admin/articles' }">
          <el-scrollbar height="100vh">
            <RouterView></RouterView>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>

  <sidebarMenu v-model="drawer">
    <template #body>
      <Menu :list="menuList"></Menu>
    </template>
  </sidebarMenu>

</template>
