import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import autoprefixer from 'autoprefixer'
// 导入icon 自动插件
import Icons from 'unplugin-icons/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // vueDevTools(),
    vue(),
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
  css: {
    postcss: {
      plugins: [autoprefixer()] // 兼容css
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
