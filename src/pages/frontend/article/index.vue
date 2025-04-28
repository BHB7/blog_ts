<script setup lang="ts">
import Copyright from '@/components/article/copyright.vue'

</script>
<template>
  <div class="card overflow-y-auto p-10 card-border primary-content	">
    字符串格式化
    格式化的过程中，如果遇到数字，可以使用 :[格式]来指定数字的格式。

    采用 f 前缀进行格式化。
    <div class="mockup-code w-full">
      <pre data-prefix="$"><code>npm i daisyui</code></pre>
    </div>
    name = 'Kahvia'
    money = 143.257
    dialog = f'Hello {name}, your money is {money:.2f}.'
    print(dialog)
    Hello Kahvia, your money is 143.26.

    采用 format 方法
    name = 'Kahvia'
    name2 = 'Adong'
    dialog = 'Hello {0}, and {1}.'.format(name, name2)
    print(dialog)
    dialog = 'Hello {n1}, and {n2}.'.format(n1=name, n2=name2)
    print(dialog)
    Hello Kahvia, and Adong.
    Hello Kahvia, and Adong.

    自定义函数
    采用关键词 def 来定义函数，并跟随:表示下面的缩进行是函数体。
    <!-- 作者 版权声明 -->
    <Copyright></Copyright>
  </div>
</template>
