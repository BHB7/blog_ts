import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import wasm from 'vite-plugin-wasm';
// 导入icon 自动插件
import Icons from 'unplugin-icons/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // vueDevTools(),
    vue(),
    wasm(),
    tailwindcss(),
    // 导入icon自动下载icon
    Icons({ autoInstall: true, compiler: 'vue3' }),
    // 自动注册组件
    Components({
      resolvers: [
        IconsResolver({
          prefix: 'icon', // 图标前缀，默认为 `i`
        }),
      ],
      dts: true, // 自动生成类型声明文件
    }),
  ],
  build: {
    target: 'esnext'  // 支持最新的 JavaScript 特性，包括 top-level await
  },
  esbuild: {
    target: ['chrome90', 'firefox90', 'safari15'] // 目标浏览器版本
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
